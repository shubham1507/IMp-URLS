from flask import Flask, request, jsonify, render_template_string
from PIL import Image
import pytesseract
import base64
import io
import re

app = Flask(__name__)

HTML_PAGE = """
<!DOCTYPE html>
<html>
<head>
<title>Image to Text</title>
<style>
  body { font-family: sans-serif; max-width: 700px; margin: 40px auto; padding: 0 20px; }
  #pastearea {
    border: 2px dashed #888;
    padding: 30px;
    text-align: center;
    color: #666;
    cursor: text;
    min-height: 60px;
  }
  #output {
    width: 100%;
    height: 250px;
    margin-top: 20px;
    font-family: monospace;
    font-size: 14px;
    padding: 10px;
    box-sizing: border-box;
  }
  #status { color: #888; font-size: 13px; margin-top: 8px; }
</style>
</head>
<body>
  <h3>Paste image here (Ctrl+V)</h3>
  <div id="pastearea" tabindex="0">Click here, then paste an image (Ctrl+V)</div>
  <div id="status"></div>
  <textarea id="output" placeholder="Extracted text will appear here..."></textarea>

  <script>
    const pastearea = document.getElementById('pastearea');
    const output = document.getElementById('output');
    const status = document.getElementById('status');

    pastearea.addEventListener('paste', async (e) => {
      const items = e.clipboardData.items;
      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          const reader = new FileReader();
          reader.onload = async function(evt) {
            status.textContent = 'Processing...';
            const base64Data = evt.target.result;
            try {
              const res = await fetch('/ocr', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({image: base64Data})
              });
              const data = await res.json();
              if (data.error) {
                status.textContent = 'Error: ' + data.error;
              } else {
                output.value = data.text;
                status.textContent = 'Done.';
              }
            } catch (err) {
              status.textContent = 'Error: ' + err;
            }
          };
          reader.readAsDataURL(file);
        }
      }
    });

    // Make it focusable/clickable to receive paste
    pastearea.addEventListener('click', () => pastearea.focus());
  </script>
</body>
</html>
"""

@app.route('/')
def index():
    return render_template_string(HTML_PAGE)

def is_noise(token):
    """Detect OCR garbage typically produced by radio button / checkbox icons."""
    # Tokens containing brace/semicolon/pipe characters are almost always icon noise
    if any(c in token for c in '{};|'):
        return True
    # Tokens made up ONLY of O/0/o/Q and punctuation (no real letters/words)
    if re.fullmatch(r'[O0oQ,./]+', token):
        return True
    return False


@app.route('/ocr', methods=['POST'])
def ocr():
    try:
        data = request.get_json()
        image_data = data['image']
        # Strip data URL prefix e.g. "data:image/png;base64,"
        image_data = re.sub('^data:image/.+;base64,', '', image_data)
        img_bytes = base64.b64decode(image_data)
        img = Image.open(io.BytesIO(img_bytes))

        text = pytesseract.image_to_string(img)

        # Preserve line-by-line layout (matches option-per-line structure in the image)
        # while stripping icon/OCR noise from each line.
        result_lines = []
        for line in text.split('\n'):
            words = line.split()
            clean_words = [w for w in words if not is_noise(w)]
            if clean_words:
                result_lines.append(' '.join(clean_words))

        clean_text = '\n'.join(result_lines)
        return jsonify({'text': clean_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
#https://docs.google.com/document/d/1wZM4GvhhU3e3nbrbF6VqGfzRaVRfCiPVlnU7FuFzr-0/edit?tab=t.0
