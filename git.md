# GIT MASTERY LAB
## Beginner → Intermediate → Advanced → Expert → Internals → Troubleshooting → Interview Ready

> Goal:
> Build one small project that forces us to practically use Git from fundamentals to expert-level production scenarios.
>
> By completing this lab, you should be able to:
> - Work confidently with Git in real projects.
> - Understand what Git is doing internally.
> - Handle branching, merging, rebasing and conflicts.
> - Recover accidentally deleted commits/files/branches.
> - Work with remotes and multiple developers.
> - Use tags, stash, cherry-pick, revert, reset, reflog, bisect, hooks, submodules, worktrees, etc.
> - Understand Git objects, HEAD, refs, index and object database.
> - Troubleshoot common Git problems.
> - Answer Git interview questions from beginner to senior/architect level.
>
> Recommended terminal:
> Git Bash
>
> Project:
> git-mastery-lab
>
> We will intentionally create mistakes during this project because recovery is one of the most important Git skills.

---

# ============================================================
# 0. COMPLETE GIT LEARNING ROADMAP
# ============================================================

This single project will cover:

1. Git vs GitHub/Azure Repos/GitLab
2. Git installation
3. Git configuration
4. Creating repository
5. Working directory
6. Staging area / Index
7. Local repository
8. Commits
9. Commit IDs / SHA
10. git status
11. git add
12. git commit
13. git log
14. git show
15. git diff
16. .gitignore
17. Removing files
18. Renaming files
19. Restoring files
20. Branches
21. HEAD
22. Switching branches
23. Branch creation/deletion
24. Merge
25. Fast-forward merge
26. Three-way merge
27. Merge commits
28. Merge conflicts
29. Conflict resolution
30. Rebase
31. Interactive rebase
32. Squash
33. Fixup
34. Reword
35. Reorder commits
36. Drop commits
37. Cherry-pick
38. Revert
39. Reset
40. Soft reset
41. Mixed reset
42. Hard reset
43. Restore
44. Checkout
45. Stash
46. Multiple stashes
47. Stash apply/pop
48. Stash individual files
49. Remote repository
50. origin
51. clone
52. fetch
53. pull
54. push
55. upstream branches
56. remote tracking branches
57. multiple remotes
58. fork workflow
59. pull request workflow
60. feature branch workflow
61. GitFlow
62. trunk-based development
63. tags
64. lightweight tags
65. annotated tags
66. semantic versioning
67. detached HEAD
68. reflog
69. recovering deleted commits
70. recovering deleted branches
71. recovering after hard reset
72. git clean
73. git blame
74. git bisect
75. git grep
76. git shortlog
77. git archive
78. Git hooks
79. pre-commit hook
80. commit-msg hook
81. pre-push hook
82. commit signing concepts
83. SSH authentication
84. HTTPS authentication
85. PAT authentication
86. credentials
87. Git aliases
88. Git configuration levels
89. local/global/system config
90. line endings
91. CRLF vs LF
92. git attributes
93. Git LFS
94. sparse checkout
95. shallow clone
96. partial clone
97. submodules
98. subtree concepts
99. worktree
100. notes
101. patch generation
102. git apply
103. git am
104. bundles
105. repository maintenance
106. garbage collection
107. fsck
108. Git objects
109. blob
110. tree
111. commit object
112. tag object
113. refs
114. HEAD internals
115. index internals
116. object database
117. cat-file
118. hash-object
119. ls-tree
120. rev-parse
121. symbolic-ref
122. show-ref
123. merge-base
124. rev-list
125. log graph
126. reflog internals
127. pack files
128. gc
129. hooks in CI/CD
130. branching strategies
131. production hotfix workflow
132. release workflow
133. rollback strategies
134. force push
135. force-with-lease
136. protected branches
137. signed commits/tags concepts
138. secrets prevention
139. removing secrets from history
140. git filter-repo concepts
141. debugging Git
142. common interview scenarios
143. Git best practices

---

# ============================================================
# 1. PROJECT SCENARIO
# ============================================================

We are developing a tiny banking application.

Repository:

git-mastery-lab

Application initially contains:

git-mastery-lab/
|
|-- README.md
|-- src/
|   |-- app.txt
|   |-- login.txt
|   `-- payment.txt
|
|-- config/
|   `-- app.conf
|
|-- docs/
|   `-- architecture.md
|
|-- tests/
|   `-- test-plan.md
|
`-- .gitignore

We will act as multiple developers:

Developer A = You
Developer B = Another developer
Release Manager
Production Support Engineer

That allows us to simulate real Git workflows.

---

# ============================================================
# PHASE 1 — UNDERSTAND GIT
# ============================================================

## What is Git?

Git is a distributed version control system.

It tracks versions of files and allows developers to:

- collaborate
- maintain history
- create branches
- merge changes
- compare versions
- revert mistakes
- release software

Git is NOT GitHub.

Git:
Version control system.

GitHub / GitLab / Azure Repos / Bitbucket:
Remote Git repository hosting platforms.

---

# ============================================================
# PHASE 2 — INSTALLATION AND CONFIGURATION
# ============================================================

Check Git:

```bash
git --version
```

Configure identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Check configuration:

```bash
git config --list
```

Check where config is coming from:

```bash
git config --list --show-origin
```

Configuration scopes:

```bash
git config --system
git config --global
git config --local
```

Priority:

Local > Global > System

Example repository-specific email:

```bash
git config user.email "work@example.com"
```

Check:

```bash
git config user.email
```

---

# ============================================================
# PHASE 3 — CREATE THE PROJECT
# ============================================================

```bash
mkdir git-mastery-lab
cd git-mastery-lab

git init
```

Output roughly:

Initialized empty Git repository...

Check:

```bash
git status
```

Internally Git created:

```text
.git/
```

Never casually delete `.git`.

It contains the entire repository metadata/history.

---

# ============================================================
# PHASE 4 — CREATE FIRST FILE
# ============================================================

Create:

README.md

Content:

```text
# Git Mastery Banking Application

This repository is used for learning Git.
```

Check:

```bash
git status
```

Git reports:

Untracked file

Meaning:

Git sees the file but isn't tracking it.

---

# ============================================================
# PHASE 5 — UNDERSTAND THREE AREAS OF GIT
# ============================================================

Git primarily works with:

```text
Working Directory
      |
      | git add
      v
Staging Area / Index
      |
      | git commit
      v
Local Repository
```

Remote adds another layer:

```text
Working Directory
      |
      v
Staging Area
      |
      v
Local Repository
      |
      | git push
      v
Remote Repository
```

---

# ============================================================
# PHASE 6 — STAGING
# ============================================================

Stage README:

```bash
git add README.md
```

Check:

```bash
git status
```

Unstage:

```bash
git restore --staged README.md
```

Stage again:

```bash
git add README.md
```

Other forms:

```bash
git add .
git add -A
git add --all
git add src/
git add "*.md"
```

Interactive staging:

```bash
git add -p
```

`-p` is extremely useful because it lets you stage individual hunks.

---

# ============================================================
# PHASE 7 — FIRST COMMIT
# ============================================================

```bash
git commit -m "docs: add project README"
```

Check:

```bash
git log
```

Compact:

```bash
git log --oneline
```

Show latest commit:

```bash
git show
```

Show specific commit:

```bash
git show <commit-id>
```

---

# ============================================================
# PHASE 8 — CREATE APPLICATION FILES
# ============================================================

Create folders:

```bash
mkdir src
mkdir config
mkdir docs
mkdir tests
```

Create:

src/app.txt

```text
Application Name: GitBank
Version: 1.0
```

src/login.txt

```text
Login Module
Status: Initial
```

src/payment.txt

```text
Payment Module
Status: Initial
```

config/app.conf

```text
environment=development
port=8080
```

docs/architecture.md

```text
# Architecture

Client -> Application -> Database
```

tests/test-plan.md

```text
# Test Plan

Login Test
Payment Test
```

Check:

```bash
git status
```

Stage:

```bash
git add .
```

Commit:

```bash
git commit -m "feat: add initial banking application structure"
```

---

# ============================================================
# PHASE 9 — STATUS COMMAND
# ============================================================

Full status:

```bash
git status
```

Short:

```bash
git status -s
```

Examples:

```text
?? file
M  file
 M file
A  file
D  file
```

Rough interpretation:

```text
?? = untracked
M  = staged modification
 M = unstaged modification
A  = added
D  = deleted
```

---

# ============================================================
# PHASE 10 — GIT DIFF
# ============================================================

Modify:

src/login.txt

Add:

```text
Authentication: Username and Password
```

Working directory vs staging:

```bash
git diff
```

Stage:

```bash
git add src/login.txt
```

Now:

```bash
git diff
```

may show nothing.

Why?

Because `git diff` normally compares:

Working Directory vs Staging Area.

To see staged changes:

```bash
git diff --staged
```

or:

```bash
git diff --cached
```

Compare commits:

```bash
git diff HEAD~1 HEAD
```

Compare files between branches:

```bash
git diff main..feature/login
```

---

# ============================================================
# PHASE 11 — MODIFY COMMIT
# ============================================================

Commit:

```bash
git commit -m "feat: implement login authentication"
```

If commit message is wrong:

```bash
git commit --amend -m "feat: add basic login authentication"
```

If you forgot a file:

```bash
git add forgotten-file.txt
git commit --amend --no-edit
```

IMPORTANT:

Avoid amending commits already shared with other developers unless you understand history rewriting.

---

# ============================================================
# PHASE 12 — .GITIGNORE
# ============================================================

Create:

.gitignore

```text
*.log
*.tmp
.env
node_modules/
dist/
build/
coverage/
.vscode/
.idea/
```

Create ignored file:

```bash
touch application.log
```

Check:

```bash
git status
```

application.log should normally not appear.

Check why file is ignored:

```bash
git check-ignore -v application.log
```

Commit:

```bash
git add .gitignore
git commit -m "chore: add gitignore rules"
```

IMPORTANT INTERVIEW QUESTION:

What happens if a file is already tracked and later added to .gitignore?

It continues being tracked.

Remove it from index:

```bash
git rm --cached filename
```

For directory:

```bash
git rm -r --cached directory/
```

---

# ============================================================
# PHASE 13 — REMOVE AND RENAME
# ============================================================

Git-aware delete:

```bash
git rm filename
```

Rename:

```bash
git mv old.txt new.txt
```

Git technically detects similarity/rename during comparison rather than permanently recording a rename operation.

---

# ============================================================
# PHASE 14 — RESTORE FILES
# ============================================================

Modify file accidentally.

Discard unstaged modification:

```bash
git restore filename
```

Restore from particular commit:

```bash
git restore --source=<commit> filename
```

Old syntax:

```bash
git checkout -- filename
```

Modern recommendation:

Use:

```bash
git restore
git switch
```

rather than using `checkout` for everything.

---

# ============================================================
# PHASE 15 — UNDERSTAND HEAD
# ============================================================

HEAD represents what is currently checked out.

Check:

```bash
git rev-parse HEAD
```

Current branch:

```bash
git branch --show-current
```

Internally:

```bash
cat .git/HEAD
```

Usually:

```text
ref: refs/heads/main
```

Meaning:

HEAD -> main -> commit

Conceptually:

```text
HEAD
 |
 v
main
 |
 v
C3 -> C2 -> C1
```

---

# ============================================================
# PHASE 16 — BRANCHING
# ============================================================

List branches:

```bash
git branch
```

Create:

```bash
git branch feature/login-ui
```

Switch:

```bash
git switch feature/login-ui
```

Create + switch:

```bash
git switch -c feature/payment-validation
```

Old syntax:

```bash
git checkout -b feature/payment-validation
```

Return:

```bash
git switch main
```

Delete merged branch:

```bash
git branch -d feature/login-ui
```

Force delete:

```bash
git branch -D feature/login-ui
```

Rename branch:

```bash
git branch -m old-name new-name
```

---

# ============================================================
# PHASE 17 — FEATURE BRANCH WORKFLOW
# ============================================================

```bash
git switch -c feature/login-validation
```

Modify:

src/login.txt

```text
Validation:
- Username required
- Password required
```

Commit:

```bash
git add src/login.txt
git commit -m "feat: add login field validation"
```

Create another commit:

```text
Error Message:
Invalid credentials
```

```bash
git add src/login.txt
git commit -m "feat: add login error handling"
```

Inspect graph:

```bash
git log --oneline --graph --decorate --all
```

This command is extremely important.

---

# ============================================================
# PHASE 18 — FAST-FORWARD MERGE
# ============================================================

Switch:

```bash
git switch main
```

Merge:

```bash
git merge feature/login-validation
```

If main did not change after branch creation:

```text
Fast-forward merge
```

Concept:

Before:

```text
A---B main
     \
      C---D feature
```

After:

```text
A---B---C---D
             ^
         main, feature
```

No merge commit required.

---

# ============================================================
# PHASE 19 — FORCE MERGE COMMIT
# ============================================================

Create feature:

```bash
git switch -c feature/audit
```

Modify:

src/app.txt

Commit.

Then:

```bash
git switch main
git merge --no-ff feature/audit
```

`--no-ff` forces creation of a merge commit.

Useful when teams want feature history explicitly represented.

---

# ============================================================
# PHASE 20 — THREE-WAY MERGE
# ============================================================

Scenario:

```text
       C---D feature
      /
A---B
     \
      E---F main
```

Both branches progressed independently.

Git uses:

1. merge base
2. feature tip
3. main tip

and creates:

```text
       C---D
      /     \
A---B         M
      \      /
       E----F
```

M = merge commit.

Find merge base:

```bash
git merge-base main feature-branch
```

---

# ============================================================
# PHASE 21 — MERGE CONFLICT
# ============================================================

Create:

```bash
git switch -c feature/payment-message
```

Change src/payment.txt:

```text
Payment Status: SUCCESS
```

Commit.

Switch main:

```bash
git switch main
```

Change same line:

```text
Payment Status: COMPLETED
```

Commit.

Merge:

```bash
git merge feature/payment-message
```

Conflict:

```text
<<<<<<< HEAD
Payment Status: COMPLETED
=======
Payment Status: SUCCESS
>>>>>>> feature/payment-message
```

Resolve manually:

```text
Payment Status: SUCCESS
```

Then:

```bash
git add src/payment.txt
git commit
```

Check conflicted files:

```bash
git status
```

Abort merge:

```bash
git merge --abort
```

---

# ============================================================
# PHASE 22 — REBASE
# ============================================================

Suppose:

```text
A---B---C main
     \
      D---E feature
```

Run:

```bash
git switch feature
git rebase main
```

Result:

```text
A---B---C---D'---E'
```

D/E get new commit hashes.

Why?

Rebase rewrites commit history.

Merge preserves branch topology.

Rebase creates cleaner linear history.

Golden rule:

DO NOT casually rebase shared/public history.

---

# ============================================================
# PHASE 23 — REBASE CONFLICT
# ============================================================

During:

```bash
git rebase main
```

If conflict occurs:

Resolve files.

Then:

```bash
git add filename
git rebase --continue
```

Skip current commit:

```bash
git rebase --skip
```

Abort:

```bash
git rebase --abort
```

---

# ============================================================
# PHASE 24 — INTERACTIVE REBASE
# ============================================================

View last 5 commits:

```bash
git log --oneline
```

Run:

```bash
git rebase -i HEAD~5
```

Possible operations:

```text
pick
reword
edit
squash
fixup
drop
break
exec
```

Example:

```text
pick abc123 add login
squash def456 fix login
fixup ghi789 typo
reword jkl012 payment feature
```

Use interactive rebase to:

- combine commits
- clean commit history
- rename messages
- remove unwanted commits
- reorder commits

---

# ============================================================
# PHASE 25 — SQUASH COMMITS
# ============================================================

Suppose:

```text
add payment
fix payment
fix typo
fix payment again
```

Clean history using:

```bash
git rebase -i HEAD~4
```

Result:

```text
feat: implement payment functionality
```

Much cleaner for pull requests.

---

# ============================================================
# PHASE 26 — CHERRY-PICK
# ============================================================

Use when you need one specific commit from another branch.

Find commit:

```bash
git log feature/payment --oneline
```

Then:

```bash
git switch main
git cherry-pick <commit-id>
```

Multiple commits:

```bash
git cherry-pick commit1 commit2
```

Range:

```bash
git cherry-pick A..B
```

Abort:

```bash
git cherry-pick --abort
```

Continue after conflict:

```bash
git add .
git cherry-pick --continue
```

---

# ============================================================
# PHASE 27 — GIT REVERT
# ============================================================

Suppose bad commit reached shared main.

Do NOT usually reset shared main.

Instead:

```bash
git revert <commit-id>
```

Git creates another commit that reverses the previous change.

History:

```text
A---B---BAD---REVERT
```

Safe for shared branches.

Revert merge commit:

```bash
git revert -m 1 <merge-commit>
```

Requires understanding which parent should remain the mainline.

---

# ============================================================
# PHASE 28 — GIT RESET
# ============================================================

Three main reset modes.

## Soft

```bash
git reset --soft HEAD~1
```

Moves branch pointer.

Changes remain STAGED.

## Mixed

```bash
git reset HEAD~1
```

or:

```bash
git reset --mixed HEAD~1
```

Changes remain in Working Directory but are UNSTAGED.

## Hard

```bash
git reset --hard HEAD~1
```

Moves branch and discards tracked working/staging changes.

Dangerous.

Remember:

```text
SOFT
Commit removed
Changes staged

MIXED
Commit removed
Changes unstaged

HARD
Commit removed
Tracked changes discarded
```

---

# ============================================================
# PHASE 29 — RESET VS REVERT VS RESTORE
# ============================================================

```text
RESET
Moves branch/HEAD pointer.
Often rewrites history.

REVERT
Creates a new commit undoing an old commit.
Safe for shared history.

RESTORE
Restores file contents/staging state.
Mostly file-level operation.
```

Interview favourite.

---

# ============================================================
# PHASE 30 — STASH
# ============================================================

Modify files but don't commit.

```bash
git stash
```

Better:

```bash
git stash push -m "WIP payment validation"
```

List:

```bash
git stash list
```

Show:

```bash
git stash show
```

Detailed:

```bash
git stash show -p stash@{0}
```

Apply:

```bash
git stash apply
```

Pop:

```bash
git stash pop
```

Apply specific:

```bash
git stash apply stash@{1}
```

Drop:

```bash
git stash drop stash@{0}
```

Clear:

```bash
git stash clear
```

Include untracked:

```bash
git stash -u
```

Include ignored:

```bash
git stash -a
```

Interactive:

```bash
git stash -p
```

Create branch from stash:

```bash
git stash branch feature/from-stash stash@{0}
```

---

# ============================================================
# PHASE 31 — TAGGING
# ============================================================

Lightweight tag:

```bash
git tag v1.0.0
```

Annotated tag:

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
```

List:

```bash
git tag
```

Show:

```bash
git show v1.0.0
```

Tag older commit:

```bash
git tag -a v0.9.0 <commit-id> -m "Legacy release"
```

Delete:

```bash
git tag -d v1.0.0
```

Push one:

```bash
git push origin v1.0.0
```

Push all:

```bash
git push origin --tags
```

Remote delete:

```bash
git push origin --delete v1.0.0
```

Semantic Versioning:

```text
MAJOR.MINOR.PATCH

1.4.2

MAJOR = breaking changes
MINOR = backward-compatible functionality
PATCH = backward-compatible bug fix
```

---

# ============================================================
# PHASE 32 — DETACHED HEAD
# ============================================================

Checkout/switch to specific commit:

```bash
git switch --detach <commit-id>
```

or:

```bash
git checkout <commit-id>
```

HEAD now points directly to commit rather than branch.

```text
HEAD -> commit
```

If you create useful commits here, preserve them:

```bash
git switch -c recovery/my-work
```

---

# ============================================================
# PHASE 33 — REFLOG
# ============================================================

One of Git's most powerful recovery tools.

```bash
git reflog
```

Records local movements of HEAD/refs.

Example:

```text
abc123 HEAD@{0}: reset: moving to HEAD~2
def456 HEAD@{1}: commit: important payment feature
```

Recover:

```bash
git reset --hard def456
```

or safer:

```bash
git branch recovery def456
```

Use reflog for:

- accidental hard reset
- deleted branch
- lost commits
- bad rebase
- bad amend
- detached HEAD work

---

# ============================================================
# PHASE 34 — DELETE AND RECOVER BRANCH
# ============================================================

Delete:

```bash
git branch -D feature/payment
```

Find commit:

```bash
git reflog
```

Recover:

```bash
git branch feature/payment <commit-id>
```

---

# ============================================================
# PHASE 35 — GIT CLEAN
# ============================================================

Remove untracked files.

Preview FIRST:

```bash
git clean -n
```

Delete:

```bash
git clean -f
```

Directories:

```bash
git clean -fd
```

Ignored files too:

```bash
git clean -fdx
```

Dangerous.

Always preview whenever possible.

---

# ============================================================
# PHASE 36 — REMOTE REPOSITORY
# ============================================================

Create an empty GitHub/Azure Repos/GitLab repository.

Add:

```bash
git remote add origin <repository-url>
```

Check:

```bash
git remote -v
```

Detailed:

```bash
git remote show origin
```

Push:

```bash
git push -u origin main
```

`-u` establishes tracking relationship.

After that:

```bash
git push
git pull
```

usually work without branch arguments.

---

# ============================================================
# PHASE 37 — REMOTE TRACKING BRANCHES
# ============================================================

You may see:

```text
main
origin/main
```

They are NOT the same thing.

```text
main
```

Local branch.

```text
origin/main
```

Your local reference representing the last known state of remote main.

Update it:

```bash
git fetch origin
```

---

# ============================================================
# PHASE 38 — FETCH VS PULL
# ============================================================

Fetch:

```bash
git fetch
```

Downloads objects/ref updates but doesn't automatically integrate them into your current branch.

Pull:

```bash
git pull
```

Conceptually commonly:

```text
git fetch
+
git merge
```

Depending on configuration, pull can use rebase:

```bash
git pull --rebase
```

Compare before merging:

```bash
git fetch origin
git log HEAD..origin/main --oneline
git diff HEAD..origin/main
```

---

# ============================================================
# PHASE 39 — CLONE
# ============================================================

```bash
git clone <url>
```

Specific branch:

```bash
git clone --branch develop <url>
```

Shallow clone:

```bash
git clone --depth 1 <url>
```

Clone into custom directory:

```bash
git clone <url> my-directory
```

---

# ============================================================
# PHASE 40 — UPSTREAM TRACKING
# ============================================================

Check:

```bash
git branch -vv
```

Set:

```bash
git branch --set-upstream-to=origin/main main
```

or first push:

```bash
git push -u origin feature/login
```

---

# ============================================================
# PHASE 41 — MULTIPLE REMOTES
# ============================================================

Example fork workflow:

```bash
git remote -v
```

You may have:

```text
origin    your-fork
upstream  official-project
```

Add:

```bash
git remote add upstream <official-repository-url>
```

Fetch:

```bash
git fetch upstream
```

Sync:

```bash
git switch main
git merge upstream/main
```

or:

```bash
git rebase upstream/main
```

---

# ============================================================
# PHASE 42 — PUSH OPTIONS
# ============================================================

Normal:

```bash
git push
```

Set upstream:

```bash
git push -u origin feature/login
```

Delete remote branch:

```bash
git push origin --delete feature/login
```

Force:

```bash
git push --force
```

Safer:

```bash
git push --force-with-lease
```

Prefer:

```bash
--force-with-lease
```

It protects against blindly overwriting remote updates you haven't seen.

---

# ============================================================
# PHASE 43 — REAL TEAM COLLABORATION CONFLICT
# ============================================================

Developer A:

```bash
git clone repo developer-a
```

Developer B:

```bash
git clone repo developer-b
```

Both modify same line.

Developer A pushes first.

Developer B:

```bash
git push
```

gets rejection.

Developer B should:

```bash
git pull --rebase
```

Resolve conflict:

```bash
git add .
git rebase --continue
git push
```

This is a common production scenario.

---

# ============================================================
# PHASE 44 — GIT LOG ADVANCED
# ============================================================

```bash
git log
git log --oneline
git log --graph
git log --decorate
git log --all
```

Recommended:

```bash
git log --oneline --graph --decorate --all
```

Last five:

```bash
git log -5
```

Author:

```bash
git log --author="John"
```

Date:

```bash
git log --since="2 weeks ago"
```

File history:

```bash
git log -- src/payment.txt
```

Follow rename:

```bash
git log --follow -- src/payment.txt
```

Patch:

```bash
git log -p
```

Statistics:

```bash
git log --stat
```

Search commit messages:

```bash
git log --grep="payment"
```

Search commits where string count changed:

```bash
git log -S"Payment"
```

Regex-based diff search:

```bash
git log -G"Payment.*Status"
```

---

# ============================================================
# PHASE 45 — GIT BLAME
# ============================================================

```bash
git blame src/payment.txt
```

Shows which commit last changed each line.

Range:

```bash
git blame -L 10,20 filename
```

Useful for:

- understanding change history
- identifying context
- debugging

Don't use it as a tool for blaming people.

---

# ============================================================
# PHASE 46 — GIT GREP
# ============================================================

Search tracked content:

```bash
git grep "Payment"
```

Line numbers:

```bash
git grep -n "Payment"
```

At old revision:

```bash
git grep "Payment" HEAD~5
```

---

# ============================================================
# PHASE 47 — GIT BISECT
# ============================================================

Scenario:

Application worked in v1.0 but current version is broken.

Start:

```bash
git bisect start
```

Mark current bad:

```bash
git bisect bad
```

Mark known good:

```bash
git bisect good v1.0.0
```

Git checks middle commit.

Test.

Then:

```bash
git bisect good
```

or:

```bash
git bisect bad
```

Eventually Git identifies first bad commit.

Finish:

```bash
git bisect reset
```

Automated:

```bash
git bisect run ./test-script.sh
```

Extremely strong interview concept.

---

# ============================================================
# PHASE 48 — SHORTLOG
# ============================================================

```bash
git shortlog
```

Summarize authors:

```bash
git shortlog -sn
```

Useful for contribution summaries.

---

# ============================================================
# PHASE 49 — ARCHIVE
# ============================================================

Create release archive:

```bash
git archive --format=zip HEAD > release.zip
```

Specific tag:

```bash
git archive --format=zip v1.0.0 > release-v1.zip
```

---

# ============================================================
# PHASE 50 — PATCHES
# ============================================================

Generate patch:

```bash
git diff > payment.patch
```

Apply:

```bash
git apply payment.patch
```

Generate commit patch:

```bash
git format-patch -1 HEAD
```

Apply commit patch preserving metadata:

```bash
git am <patch-file>
```

Useful for offline collaboration and mailing-list workflows.

---

# ============================================================
# PHASE 51 — GIT WORKTREE
# ============================================================

Problem:

You are working on feature branch.

Production issue arrives.

Instead of stashing/switching:

```bash
git worktree add ../gitbank-hotfix hotfix/production
```

You now have another working directory.

List:

```bash
git worktree list
```

Remove:

```bash
git worktree remove ../gitbank-hotfix
```

Great senior-level feature.

---

# ============================================================
# PHASE 52 — SUBMODULES
# ============================================================

Add another repository inside repository:

```bash
git submodule add <repo-url> libs/common
```

Commit:

```bash
git add .gitmodules libs/common
git commit -m "chore: add common library submodule"
```

Clone repository containing submodules:

```bash
git clone --recurse-submodules <url>
```

Existing clone:

```bash
git submodule init
git submodule update
```

or:

```bash
git submodule update --init --recursive
```

Update:

```bash
git submodule update --remote
```

Important:

Parent repository stores a specific submodule commit reference.

---

# ============================================================
# PHASE 53 — SUBTREE CONCEPT
# ============================================================

Subtree is another method for embedding external repositories.

Typical commands:

```bash
git subtree add
git subtree pull
git subtree push
```

Difference:

Submodule:
External repository remains separately referenced.

Subtree:
External project content can live directly within repository history.

---

# ============================================================
# PHASE 54 — SPARSE CHECKOUT
# ============================================================

Useful for huge monorepos.

```bash
git sparse-checkout init --cone
git sparse-checkout set src docs
```

Now working tree primarily contains selected paths.

Disable:

```bash
git sparse-checkout disable
```

---

# ============================================================
# PHASE 55 — SHALLOW CLONE
# ============================================================

```bash
git clone --depth 1 <url>
```

Fetch more history:

```bash
git fetch --deepen=50
```

Convert toward full history:

```bash
git fetch --unshallow
```

Useful in CI/CD when full history is unnecessary.

---

# ============================================================
# PHASE 56 — PARTIAL CLONE
# ============================================================

Example:

```bash
git clone --filter=blob:none <url>
```

Reduces initial data transfer for suitable servers/repositories.

Different from shallow clone:

Shallow:
Limits commit history depth.

Partial clone:
Can omit selected object data initially.

---

# ============================================================
# PHASE 57 — GIT ATTRIBUTES
# ============================================================

Create:

.gitattributes

Example:

```text
* text=auto
*.sh text eol=lf
*.bat text eol=crlf
*.png binary
```

Useful for:

- line endings
- binary detection
- diff behavior
- merge behavior
- filters

---

# ============================================================
# PHASE 58 — CRLF VS LF
# ============================================================

Linux/macOS commonly:

```text
LF
```

Windows commonly:

```text
CRLF
```

Check:

```bash
git config --global core.autocrlf
```

Common Windows setting:

```bash
git config --global core.autocrlf true
```

Cross-platform repositories often use `.gitattributes` for deterministic line-ending policy.

---

# ============================================================
# PHASE 59 — GIT LFS
# ============================================================

Git LFS is designed for large binary files.

Install/configure:

```bash
git lfs install
```

Track:

```bash
git lfs track "*.psd"
```

This updates:

```text
.gitattributes
```

Check:

```bash
git lfs ls-files
```

Git repositories generally should not store huge binaries directly in normal Git history.

---

# ============================================================
# PHASE 60 — GIT ALIASES
# ============================================================

Create:

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
```

Excellent log alias:

```bash
git config --global alias.lg "log --oneline --graph --decorate --all"
```

Then:

```bash
git lg
```

---

# ============================================================
# PHASE 61 — GIT HOOKS
# ============================================================

Stored locally in:

```text
.git/hooks/
```

Common hooks:

```text
pre-commit
prepare-commit-msg
commit-msg
post-commit
pre-rebase
pre-push
post-checkout
post-merge
```

Example pre-commit:

```bash
#!/bin/sh

echo "Running pre-commit validation..."

if git grep -n "PASSWORD=" --cached; then
    echo "Potential secret detected."
    exit 1
fi

exit 0
```

Make executable on Unix:

```bash
chmod +x .git/hooks/pre-commit
```

Hooks can run:

- formatting
- linting
- tests
- secret scanning
- commit-message validation

Important:

`.git/hooks` normally isn't committed.

Teams frequently use frameworks/tools to distribute hooks.

CI/CD should still enforce critical checks because client-side hooks can be bypassed.

---

# ============================================================
# PHASE 62 — COMMIT MESSAGE STANDARD
# ============================================================

Recommended Conventional Commit style:

```text
feat: add payment validation
fix: resolve duplicate payment issue
docs: update architecture
test: add login test cases
refactor: simplify login service
chore: update tooling
ci: update pipeline
build: update build process
perf: improve payment performance
```

Format:

```text
type(scope): description
```

Example:

```text
feat(payment): implement transaction validation
```

---

# ============================================================
# PHASE 63 — GIT NOTES
# ============================================================

Attach metadata to commit without modifying the commit:

```bash
git notes add -m "Validated in production" <commit>
```

Show:

```bash
git notes show <commit>
```

List:

```bash
git notes list
```

---

# ============================================================
# PHASE 64 — BUNDLE
# ============================================================

Useful for transferring Git history without network.

Create:

```bash
git bundle create repo.bundle --all
```

Verify:

```bash
git bundle verify repo.bundle
```

Clone:

```bash
git clone repo.bundle recovered-repo
```

---

# ============================================================
# PHASE 65 — INTERNAL GIT OBJECT MODEL
# ============================================================

Now enter expert-level Git.

Git fundamentally stores objects.

Main object types:

```text
blob
tree
commit
tag
```

## Blob

Stores file content.

## Tree

Represents directory structure and references blobs/subtrees.

## Commit

References:

- tree
- parent commit(s)
- author
- committer
- message

## Tag

Annotated metadata referencing another object.

Concept:

```text
Commit
 |
 v
Tree
 | \
 |  \
Blob Tree
      |
     Blob
```

---

# ============================================================
# PHASE 66 — INSPECT OBJECTS
# ============================================================

Commit SHA:

```bash
git rev-parse HEAD
```

Type:

```bash
git cat-file -t HEAD
```

Output:

```text
commit
```

Content:

```bash
git cat-file -p HEAD
```

You may see:

```text
tree <sha>
parent <sha>
author ...
committer ...

commit message
```

Inspect tree:

```bash
git cat-file -p <tree-sha>
```

or:

```bash
git ls-tree HEAD
```

Recursive:

```bash
git ls-tree -r HEAD
```

Inspect blob:

```bash
git cat-file -p <blob-sha>
```

---

# ============================================================
# PHASE 67 — HASH OBJECT
# ============================================================

Create:

```text
hello.txt
```

Calculate object hash:

```bash
git hash-object hello.txt
```

Write object into database:

```bash
git hash-object -w hello.txt
```

Git content-addresses objects.

Modern Git may support different repository hash algorithms depending on repository setup, though SHA-1 remains common in existing repositories.

---

# ============================================================
# PHASE 68 — REFERENCES
# ============================================================

Show refs:

```bash
git show-ref
```

Branch references often live logically under:

```text
refs/heads/
```

Remote tracking refs:

```text
refs/remotes/
```

Tags:

```text
refs/tags/
```

Check current symbolic ref:

```bash
git symbolic-ref HEAD
```

---

# ============================================================
# PHASE 69 — REVISION EXPRESSIONS
# ============================================================

Current:

```bash
HEAD
```

Parent:

```bash
HEAD^
```

First parent:

```bash
HEAD^1
```

Grandparent using ancestry:

```bash
HEAD~2
```

Examples:

```bash
git show HEAD~
git show HEAD~3
git diff HEAD~2 HEAD
```

Two-parent merge commit:

```text
M^1
M^2
```

`^` is parent selection.

`~` repeatedly follows first-parent ancestry.

---

# ============================================================
# PHASE 70 — REV-PARSE
# ============================================================

Resolve revision:

```bash
git rev-parse HEAD
```

Current repository top-level:

```bash
git rev-parse --show-toplevel
```

Check whether inside work tree:

```bash
git rev-parse --is-inside-work-tree
```

Current branch symbolic name when applicable:

```bash
git symbolic-ref --short HEAD
```

---

# ============================================================
# PHASE 71 — REV-LIST
# ============================================================

List commits:

```bash
git rev-list HEAD
```

Count:

```bash
git rev-list --count HEAD
```

Commits on feature but not main:

```bash
git rev-list main..feature
```

---

# ============================================================
# PHASE 72 — MERGE-BASE
# ============================================================

```bash
git merge-base main feature/login
```

Returns best common ancestor used in merge/rebase reasoning.

Important senior interview concept.

---

# ============================================================
# PHASE 73 — INDEX INTERNALS
# ============================================================

The index is Git's staging area.

Inspect:

```bash
git ls-files --stage
```

Example conceptually:

```text
100644 <blob-id> 0 README.md
```

The index contains metadata/object references representing what the next commit will contain.

---

# ============================================================
# PHASE 74 — PACKFILES
# ============================================================

Git initially creates loose objects.

To optimize storage Git packs objects.

Inspect:

```text
.git/objects/
```

Run:

```bash
git gc
```

You may see:

```text
.git/objects/pack/
```

Pack files improve storage/network efficiency.

---

# ============================================================
# PHASE 75 — REPOSITORY MAINTENANCE
# ============================================================

Garbage collection:

```bash
git gc
```

Aggressive:

```bash
git gc --aggressive
```

Check integrity:

```bash
git fsck
```

Dangling/unreachable objects can sometimes help recovery:

```bash
git fsck --lost-found
```

Repository statistics:

```bash
git count-objects -v
```

---

# ============================================================
# PHASE 76 — SECURITY: NEVER COMMIT SECRETS
# ============================================================

Never intentionally commit:

```text
passwords
API keys
private keys
access tokens
cloud credentials
database credentials
.env secrets
```

`.gitignore` helps prevent accidental addition.

But:

If secret was committed once, deleting it later DOES NOT remove it from repository history.

You must:

1. Rotate/revoke the secret.
2. Remove it from current code.
3. Rewrite history when appropriate.
4. Coordinate force-push/history replacement.
5. Tell collaborators to re-clone/rebase appropriately.

Modern history cleanup tool commonly used:

```text
git filter-repo
```

Conceptual example:

```bash
git filter-repo --path secrets.txt --invert-paths
```

Do not perform history rewriting casually in shared repositories.

---

# ============================================================
# PHASE 77 — COMMIT/TAG SIGNING CONCEPT
# ============================================================

Git can cryptographically sign commits/tags.

Common approaches include GPG and SSH-based signing depending on environment/platform support.

Example concept:

```bash
git commit -S -m "feat: secure release"
```

Signed tag:

```bash
git tag -s v2.0.0 -m "Signed production release"
```

Verification:

```bash
git verify-commit <commit>
git verify-tag v2.0.0
```

Useful for supply-chain integrity and identity verification.

---

# ============================================================
# PHASE 78 — HTTPS VS SSH
# ============================================================

HTTPS remote:

```text
https://...
```

Modern hosted Git typically uses a credential helper/token rather than account password.

SSH:

```text
git@host:organization/repository.git
```

Generate SSH key example:

```bash
ssh-keygen -t ed25519
```

General concept:

```text
Private key
Keep securely on your machine.

Public key
Register with Git hosting provider.
```

Never share private key.

---

# ============================================================
# PHASE 79 — CHANGE REMOTE URL
# ============================================================

Check:

```bash
git remote -v
```

Change:

```bash
git remote set-url origin <new-url>
```

Rename remote:

```bash
git remote rename origin github
```

Remove:

```bash
git remote remove upstream
```

---

# ============================================================
# PHASE 80 — BRANCHING STRATEGIES
# ============================================================

## Feature Branch

```text
main
 |
 +--- feature/login
 |
 +--- feature/payment
```

Each feature gets branch.

---

## GitFlow

Typical branches:

```text
main
develop
feature/*
release/*
hotfix/*
```

Flow:

```text
feature -> develop -> release -> main
                     |
                     -> bug fixes

hotfix -> main + develop
```

Useful for structured release cycles, though it can be heavy for continuously deployed products.

---

## Trunk-Based Development

Main/trunk is primary integration branch.

Developers use:

- very short-lived branches
- frequent integration
- feature flags
- automated testing

Common in high-performing CI/CD environments.

---

## Release Branching

```text
main
 |
 +-- release/2.0
```

Useful when supporting versions independently.

---

# ============================================================
# PHASE 81 — PRODUCTION HOTFIX SCENARIO
# ============================================================

Production v2.0 has critical defect.

```bash
git switch main
git pull
git switch -c hotfix/payment-timeout
```

Fix.

```bash
git add .
git commit -m "fix(payment): resolve production timeout"
```

Push:

```bash
git push -u origin hotfix/payment-timeout
```

PR review.

Merge.

Tag:

```bash
git tag -a v2.0.1 -m "Production hotfix"
git push origin v2.0.1
```

If develop/release line also needs fix:

Merge/cherry-pick as per team's branching strategy.

---

# ============================================================
# PHASE 82 — ROLLBACK STRATEGY
# ============================================================

Bad commit already merged into shared main:

Preferred:

```bash
git revert <commit>
git push
```

Bad merge:

```bash
git revert -m 1 <merge-commit>
```

Private local commit:

Reset may be appropriate:

```bash
git reset --hard HEAD~1
```

General rule:

```text
Private history:
reset/rebase may be okay.

Shared history:
prefer revert.
```

---

# ============================================================
# PHASE 83 — PROTECTED BRANCHES
# ============================================================

Typically configure main so developers cannot directly push.

Possible rules:

```text
Require PR
Require review
Require CI checks
Require signed commits if desired
Restrict force pushes
Restrict deletion
Require issue linkage
Require security scans
Require successful builds
```

Implemented in Git hosting platform rather than core Git itself.

---

# ============================================================
# PHASE 84 — PULL REQUEST WORKFLOW
# ============================================================

Developer:

```bash
git switch -c feature/new-payment
```

Develop.

```bash
git add .
git commit -m "feat(payment): add new payment workflow"
git push -u origin feature/new-payment
```

Create Pull Request.

Pipeline:

```text
Build
Unit Tests
SAST
SCA
Secret Scan
Container Scan
IaC Scan
Integration Tests
```

Review.

Merge.

Delete branch.

Sync local:

```bash
git switch main
git pull
git branch -d feature/new-payment
git fetch --prune
```

---

# ============================================================
# PHASE 85 — FETCH PRUNE
# ============================================================

Remote branches deleted on server may remain as stale remote-tracking references locally.

Clean:

```bash
git fetch --prune
```

or:

```bash
git remote prune origin
```

Enable automatically:

```bash
git config --global fetch.prune true
```

---

# ============================================================
# PHASE 86 — REBASE VS MERGE DECISION
# ============================================================

Use MERGE when:

```text
You want to preserve branch topology.
History is shared.
Team policy requires merge commits.
```

Use REBASE when:

```text
Cleaning your local feature branch.
Updating feature onto latest main.
Want linear history.
Commits aren't yet relied upon by others.
```

Typical feature workflow:

```bash
git fetch origin
git rebase origin/main
```

After rewriting already-pushed feature history:

```bash
git push --force-with-lease
```

Only where team policy allows.

---

# ============================================================
# PHASE 87 — AUTOSQUASH
# ============================================================

Create fixup commit:

```bash
git commit --fixup=<target-commit>
```

Then:

```bash
git rebase -i --autosquash <base>
```

Useful for cleaning PR history.

---

# ============================================================
# PHASE 88 — REBASE ONTO
# ============================================================

Advanced:

```bash
git rebase --onto newbase oldbase branch
```

Useful when commits were based on wrong branch.

Concept:

Move selected sequence of commits from one base to another.

---

# ============================================================
# PHASE 89 — CHERRY
# ============================================================

Check commits not applied upstream:

```bash
git cherry -v main feature
```

Helps compare equivalent patch content between branches.

---

# ============================================================
# PHASE 90 — RANGE-DIFF
# ============================================================

Useful when reviewing changes between two versions of a rebased patch series:

```bash
git range-diff old-base..old-tip new-base..new-tip
```

Strong advanced-review command.

---

# ============================================================
# PHASE 91 — RERERE
# ============================================================

Git can remember conflict resolutions.

Enable:

```bash
git config --global rerere.enabled true
```

`rerere` roughly means:

reuse recorded resolution.

Helpful when repeatedly resolving same conflicts during rebases/merges.

---

# ============================================================
# PHASE 92 — ASSUME-UNCHANGED / SKIP-WORKTREE
# ============================================================

Advanced index flags exist:

```bash
git update-index --assume-unchanged filename
git update-index --no-assume-unchanged filename
```

Also:

```bash
git update-index --skip-worktree filename
git update-index --no-skip-worktree filename
```

Do NOT treat these as replacements for `.gitignore`.

Their semantics are different and misuse causes confusion.

---

# ============================================================
# PHASE 93 — GIT SWITCH VS CHECKOUT
# ============================================================

Historically:

```bash
git checkout
```

handled both:

- branch switching
- file restoration

Modern commands separate responsibilities:

```bash
git switch
```

for branches.

```bash
git restore
```

for files/index.

Checkout remains widely used and important to understand.

---

# ============================================================
# PHASE 94 — GIT SHOW
# ============================================================

```bash
git show HEAD
git show <commit>
git show <tag>
git show <commit>:src/payment.txt
```

Last example shows file contents from a particular commit.

Very useful.

---

# ============================================================
# PHASE 95 — FILE FROM ANOTHER BRANCH
# ============================================================

Modern:

```bash
git restore --source=feature/payment -- src/payment.txt
```

Traditional:

```bash
git checkout feature/payment -- src/payment.txt
```

Then commit if desired.

---

# ============================================================
# PHASE 96 — EMPTY COMMIT
# ============================================================

```bash
git commit --allow-empty -m "ci: trigger deployment"
```

Sometimes useful for testing pipelines or intentionally recording an event.

---

# ============================================================
# PHASE 97 — SKIP STAGING FOR TRACKED FILES
# ============================================================

```bash
git commit -am "fix: update payment"
```

Equivalent conceptually to staging modifications/deletions of already tracked files and committing.

It does NOT automatically include brand-new untracked files.

---

# ============================================================
# PHASE 98 — SHOW CHANGED FILE NAMES
# ============================================================

```bash
git diff --name-only
```

Staged:

```bash
git diff --cached --name-only
```

Between commits:

```bash
git diff --name-status HEAD~1 HEAD
```

Statistics:

```bash
git diff --stat
```

---

# ============================================================
# PHASE 99 — DELETE LAST LOCAL COMMIT BUT KEEP WORK
# ============================================================

Keep staged:

```bash
git reset --soft HEAD~1
```

Keep unstaged:

```bash
git reset HEAD~1
```

Delete work too:

```bash
git reset --hard HEAD~1
```

---

# ============================================================
# PHASE 100 — RECOVER AFTER HARD RESET
# ============================================================

Suppose:

```bash
git reset --hard HEAD~3
```

Oops.

Run:

```bash
git reflog
```

Find prior HEAD:

```bash
git branch recovery <old-sha>
```

or:

```bash
git reset --hard <old-sha>
```

Reflog is one of the most important Git recovery tools.

---

# ============================================================
# PHASE 101 — COMMIT PARENT STRUCTURE
# ============================================================

Normal commit:

```text
1 parent
```

Initial/root commit:

```text
0 parents
```

Merge commit:

```text
2 or more parents
```

Inspect:

```bash
git cat-file -p <commit>
```

---

# ============================================================
# PHASE 102 — ORPHAN BRANCH
# ============================================================

Create branch without normal parent history:

```bash
git switch --orphan gh-pages
```

Useful for special independent histories such as site publishing patterns.

---

# ============================================================
# PHASE 103 — BARE REPOSITORY
# ============================================================

Create:

```bash
git init --bare central.git
```

Bare repository has no normal working tree.

Historically/server-side central Git repositories are commonly bare repositories.

Clone:

```bash
git clone central.git developer1
```

---

# ============================================================
# PHASE 104 — LOCAL MULTI-DEVELOPER LAB
# ============================================================

You can simulate GitHub without Internet.

Create central:

```bash
mkdir git-server
cd git-server
git init --bare project.git
```

Clone twice:

```bash
git clone project.git developer-a
git clone project.git developer-b
```

Now simulate:

- simultaneous development
- pushes
- rejected pushes
- conflicts
- fetch/pull
- rebases
- merges

This is one of the best Git practice exercises.

---

# ============================================================
# PHASE 105 — GIT CONFIG USEFUL SETTINGS
# ============================================================

Default branch:

```bash
git config --global init.defaultBranch main
```

Rebase on pull if desired:

```bash
git config --global pull.rebase true
```

Auto-prune:

```bash
git config --global fetch.prune true
```

Reuse conflict resolution:

```bash
git config --global rerere.enabled true
```

Editor example:

```bash
git config --global core.editor "code --wait"
```

---

# ============================================================
# PHASE 106 — IGNORE FILE AT LOCAL LEVEL
# ============================================================

If you want ignore rule that should NOT be committed:

```text
.git/info/exclude
```

Global ignore file can also be configured:

```bash
git config --global core.excludesfile ~/.gitignore_global
```

Useful for OS/editor-specific personal files.

---

# ============================================================
# PHASE 107 — FORCE PUSH INCIDENT
# ============================================================

Developer rebases public feature branch.

Old remote:

```text
A-B-C-D
```

Rebased local:

```text
A-B-X-Y
```

Normal push rejected.

Could use:

```bash
git push --force-with-lease
```

Why safer than `--force`?

Because lease verifies expected remote state before overwriting it.

If another developer pushed new work, it should refuse rather than blindly overwrite.

---

# ============================================================
# PHASE 108 — COMMIT IS SNAPSHOT, NOT JUST DIFF
# ============================================================

Important interview concept:

Git conceptually stores snapshots of repository state via trees/blobs.

It does not simply model history as a sequential collection of textual patches.

Git may internally compress objects efficiently using pack/delta mechanisms, but its data model is snapshot/object based.

---

# ============================================================
# PHASE 109 — WHY COMMIT HASH CHANGES AFTER REBASE
# ============================================================

Commit identity depends on commit content/metadata including:

- tree
- parent
- author information
- committer information
- message

When parent changes due to rebase, new commit object is created.

Therefore:

```text
C != C'
```

Even if file content appears identical.

---

# ============================================================
# PHASE 110 — WHY CHERRY-PICK CREATES NEW COMMIT
# ============================================================

Cherry-pick applies a commit's change onto another location/history.

Because parent/context changes, resulting commit normally gets a new hash.

---

# ============================================================
# PHASE 111 — FETCH INTERNAL IDEA
# ============================================================

`git fetch` roughly:

1. Contacts remote.
2. Determines objects/refs needed.
3. Downloads objects.
4. Updates remote-tracking refs such as:

```text
origin/main
```

It does NOT automatically merge those changes into your checked-out local branch.

---

# ============================================================
# PHASE 112 — PULL INTERNAL IDEA
# ============================================================

Typical merge-style pull:

```text
git fetch
+
git merge FETCH_HEAD
```

Pull configured for rebase:

```text
git fetch
+
git rebase
```

Check configuration:

```bash
git config --get pull.rebase
```

---

# ============================================================
# PHASE 113 — FETCH_HEAD
# ============================================================

After fetch:

```text
.git/FETCH_HEAD
```

contains information about fetched refs.

Inspect:

```bash
cat .git/FETCH_HEAD
```

Advanced debugging concept.

---

# ============================================================
# PHASE 114 — ORIG_HEAD
# ============================================================

Some operations record previous HEAD in:

```text
ORIG_HEAD
```

Can help undo certain operations.

Inspect:

```bash
git rev-parse ORIG_HEAD
```

Potential recovery:

```bash
git reset --hard ORIG_HEAD
```

Understand exactly what operation occurred before using this.

---

# ============================================================
# PHASE 115 — BISECT AUTOMATION PROJECT
# ============================================================

Create commits:

```text
C1 correct
C2 correct
C3 correct
C4 introduces bug
C5 changes documentation
C6 additional changes
```

Use:

```bash
git bisect start
git bisect bad HEAD
git bisect good <C3>
```

Identify C4.

This is a fantastic interview demonstration.

---

# ============================================================
# PHASE 116 — RELEASE MANAGEMENT PROJECT
# ============================================================

Create releases:

```text
v1.0.0
v1.1.0
v1.1.1
v2.0.0
```

Commands:

```bash
git tag -a v1.0.0 -m "Initial production release"
git tag -a v1.1.0 -m "Payment enhancements"
git tag -a v1.1.1 -m "Payment hotfix"
git tag -a v2.0.0 -m "Breaking authentication upgrade"
```

Compare releases:

```bash
git log v1.0.0..v1.1.0 --oneline
```

Changes:

```bash
git diff v1.0.0..v1.1.0
```

---

# ============================================================
# PHASE 117 — PRODUCTION RELEASE FLOW
# ============================================================

Example:

```text
Developer
   |
feature/payment
   |
   v
Pull Request
   |
CI validation
   |
main
   |
Release Pipeline
   |
Tag v2.3.0
   |
Production
```

If failure:

```text
Revert commit
or
Redeploy previous immutable artifact/tag
```

Git rollback and deployment rollback are related but NOT always the same thing.

---

# ============================================================
# PHASE 118 — GIT + CI/CD
# ============================================================

Typical CI trigger:

```text
push
pull_request
tag
```

Pipeline may use:

```bash
git clone
git fetch
git checkout
git describe
git rev-parse HEAD
git diff
```

Generate version:

```bash
git describe --tags
```

Exact SHA:

```bash
git rev-parse HEAD
```

Short SHA:

```bash
git rev-parse --short HEAD
```

Useful Docker image tag:

```text
myapp:<git-sha>
```

This creates traceability:

```text
Production Image
      |
      v
Git Commit
```

---

# ============================================================
# PHASE 119 — TROUBLESHOOT: PUSH REJECTED
# ============================================================

Error concept:

```text
rejected
non-fast-forward
```

Reason:

Remote has commits you don't have locally.

Check:

```bash
git fetch
git log --oneline --graph --all
```

Then either:

```bash
git pull --rebase
```

or:

```bash
git merge origin/main
```

Resolve conflicts.

Push.

---

# ============================================================
# PHASE 120 — TROUBLESHOOT: WRONG BRANCH COMMIT
# ============================================================

Suppose commit made on main accidentally.

If not pushed:

```bash
git branch feature/payment
git reset --hard HEAD~1
git switch feature/payment
```

Now commit remains on feature branch.

Alternative using cherry-pick:

```bash
git switch feature/payment
git cherry-pick <commit>
git switch main
git reset --hard HEAD~1
```

---

# ============================================================
# PHASE 121 — TROUBLESHOOT: COMMITTED SECRET
# ============================================================

Step 1:

Immediately revoke/rotate credential.

Step 2:

Remove from current code.

Step 3:

Remove from history if required.

Example concept:

```bash
git filter-repo ...
```

Step 4:

Coordinate rewritten history.

Step 5:

Force push only with explicit team coordination.

Step 6:

Everyone should repair/re-clone local history.

Critical:

Deleting secret in next commit DOES NOT make leaked secret safe.

---

# ============================================================
# PHASE 122 — TROUBLESHOOT: LARGE FILE
# ============================================================

Determine large objects using repository analysis tools.

If appropriate:

- remove from history
- migrate to Git LFS
- use artifact storage for build outputs
- add ignore rules

Never commit:

```text
.zip builds
ISO images
database dumps
node_modules
compiled binaries
large generated artifacts
```

unless project requirements explicitly demand it.

---

# ============================================================
# PHASE 123 — TROUBLESHOOT: LOCAL CHANGES BLOCK PULL
# ============================================================

Options:

Commit:

```bash
git add .
git commit -m "wip: save local work"
git pull
```

or stash:

```bash
git stash
git pull
git stash pop
```

Better workflow depends on whether work deserves a commit.

---

# ============================================================
# PHASE 124 — TROUBLESHOOT: MERGE IN PROGRESS
# ============================================================

Check:

```bash
git status
```

Complete:

```bash
git add .
git commit
```

or abort:

```bash
git merge --abort
```

---

# ============================================================
# PHASE 125 — TROUBLESHOOT: REBASE IN PROGRESS
# ============================================================

```bash
git status
```

Resolve.

```bash
git add .
git rebase --continue
```

or:

```bash
git rebase --abort
```

---

# ============================================================
# PHASE 126 — TROUBLESHOOT: CHERRY-PICK IN PROGRESS
# ============================================================

Resolve:

```bash
git add .
git cherry-pick --continue
```

Abort:

```bash
git cherry-pick --abort
```

---

# ============================================================
# PHASE 127 — TROUBLESHOOT: DETACHED HEAD
# ============================================================

Check:

```bash
git status
```

If work should be saved:

```bash
git switch -c recovery/my-work
```

If not:

```bash
git switch main
```

---

# ============================================================
# PHASE 128 — TROUBLESHOOT: DELETED FILE
# ============================================================

Uncommitted deletion:

```bash
git restore filename
```

File from old commit:

```bash
git restore --source=<commit> filename
```

Find history:

```bash
git log --all -- filename
```

---

# ============================================================
# PHASE 129 — TROUBLESHOOT: FIND WHO INTRODUCED BUG
# ============================================================

Use:

```bash
git log
git blame
git bisect
git show
```

Best tool when you can clearly classify revisions good/bad:

```bash
git bisect
```

---

# ============================================================
# PHASE 130 — TROUBLESHOOT: FIND DELETED BRANCH
# ============================================================

```bash
git reflog
```

Then:

```bash
git branch recovered-branch <sha>
```

---

# ============================================================
# PHASE 131 — COMMON DANGEROUS COMMANDS
# ============================================================

Understand before running:

```bash
git reset --hard
git clean -fd
git clean -fdx
git push --force
git rebase
git filter-repo
git branch -D
git stash clear
```

Safer habits:

```bash
git status
git diff
git log --graph --oneline --all
git reflog
git clean -n
git push --force-with-lease
```

---

# ============================================================
# PHASE 132 — MUST-KNOW DAILY COMMANDS
# ============================================================

```bash
git status
git add
git commit
git diff
git log
git switch
git branch
git merge
git rebase
git pull
git fetch
git push
git stash
git restore
git revert
git reset
git cherry-pick
git tag
git reflog
```

Master these first.

---

# ============================================================
# PHASE 133 — SENIOR ENGINEER COMMANDS
# ============================================================

```bash
git log --graph --decorate --all --oneline
git rebase -i
git rebase --onto
git cherry-pick
git reflog
git bisect
git merge-base
git rev-list
git rev-parse
git cat-file
git ls-tree
git worktree
git range-diff
git rerere
git fsck
git gc
git format-patch
git am
git bundle
```

---

# ============================================================
# PHASE 134 — INTERVIEW QUESTIONS
# ============================================================

## Q1. What is Git?

Distributed Version Control System used to track source code history and enable collaboration.

---

## Q2. Git vs GitHub?

Git:
Version-control software.

GitHub:
Hosting/collaboration platform built around Git repositories.

---

## Q3. What is staging area?

Intermediate index containing the snapshot intended for the next commit.

---

## Q4. What is HEAD?

Reference to current checked-out branch/commit.

---

## Q5. Fetch vs pull?

Fetch:
Downloads remote changes/references without automatically integrating into current branch.

Pull:
Fetches and then integrates, generally through merge or rebase depending on configuration/options.

---

## Q6. Merge vs rebase?

Merge:
Combines histories and can create merge commit.

Rebase:
Replays commits onto another base and rewrites those commits.

---

## Q7. Reset vs revert?

Reset:
Moves branch/HEAD pointer; can rewrite history.

Revert:
Creates a new inverse commit; safer for shared history.

---

## Q8. Soft vs mixed vs hard reset?

```text
soft  -> changes staged
mixed -> changes unstaged
hard  -> tracked changes discarded
```

---

## Q9. What is cherry-pick?

Apply change represented by selected commit(s) onto current branch, producing new commit(s).

---

## Q10. What is reflog?

Local log of updates to references such as HEAD, useful for recovery.

---

## Q11. What is fast-forward merge?

When target branch has no divergent commits and its pointer can simply advance to source branch tip.

---

## Q12. What is three-way merge?

Merge using the two branch tips plus their merge base/common ancestor.

---

## Q13. Why does rebase change commit hash?

Because rebased commits have different parent/history metadata and therefore become new commit objects.

---

## Q14. What does Git store?

Objects such as:

```text
blob
tree
commit
tag
```

---

## Q15. Does Git store diffs?

Git's conceptual object model stores snapshots through trees/blobs.

Pack files may internally delta-compress data for efficiency.

---

## Q16. What is remote tracking branch?

Local reference representing the last fetched state of a branch on a remote.

Example:

```text
origin/main
```

---

## Q17. Why is force-with-lease safer?

It refuses overwrite when remote ref no longer matches the state you expect.

---

## Q18. Why shouldn't shared history usually be rebased?

Because rewriting commits changes hashes and can create divergent histories for collaborators.

---

## Q19. What is detached HEAD?

HEAD points directly to commit rather than a local branch.

---

## Q20. What is Git bisect?

Binary-search mechanism for locating the first bad commit.

---

## Q21. What is Git stash?

Temporary storage for uncommitted working/index changes.

---

## Q22. What is Git tag?

Named reference commonly used for releases.

---

## Q23. Annotated vs lightweight tag?

Lightweight:
Simple ref to commit/object.

Annotated:
Tag object containing message, tagger information and optional signature.

---

## Q24. What is Git submodule?

A repository containing a reference to a particular commit of another repository.

---

## Q25. What is Git worktree?

Allows multiple working directories attached to the same repository, often with different branches checked out.

---

## Q26. What is merge-base?

Best common ancestor used to reason about merging branches.

---

## Q27. What is origin?

Default conventional name commonly assigned to the remote from which repository was cloned.

It isn't a special remote name hardcoded as the only possibility.

---

## Q28. Can origin be renamed?

Yes.

```bash
git remote rename origin upstream
```

---

## Q29. Can repository have multiple remotes?

Yes.

Example:

```text
origin
upstream
backup
```

---

## Q30. How do you recover hard reset?

Use:

```bash
git reflog
```

Locate old commit and recreate branch/reset.

---

# ============================================================
# PHASE 135 — 20 REAL-TIME SENIOR GIT SCENARIOS
# ============================================================

## Scenario 1

Developer committed on wrong branch.

Solution:

Create desired branch at current commit, then repair original branch.

---

## Scenario 2

Developer pushed bad commit to main.

Solution:

```bash
git revert <sha>
git push
```

---

## Scenario 3

Local commit accidentally deleted.

Solution:

```bash
git reflog
```

Recover SHA.

---

## Scenario 4

Feature branch is 50 commits behind main.

Solution usually:

```bash
git fetch origin
git rebase origin/main
```

or merge, according to team's history policy.

---

## Scenario 5

Two developers changed same line.

Solution:

Resolve merge/rebase conflict manually and test final result.

---

## Scenario 6

Need one production fix on release branch.

Solution:

```bash
git cherry-pick <sha>
```

---

## Scenario 7

Need clean PR containing 15 messy commits.

Solution:

```bash
git rebase -i
```

Squash/fixup/reword.

---

## Scenario 8

Need find commit that introduced regression.

Solution:

```bash
git bisect
```

---

## Scenario 9

Need emergency hotfix without disturbing current feature.

Solution:

```bash
git worktree
```

---

## Scenario 10

Secret committed.

Solution:

Rotate secret immediately + clean history if necessary.

---

## Scenario 11

Developer force-pushed and team commits disappeared.

Solution:

Check:

```bash
git reflog
```

and other developers' clones/refs.

Restore correct commit and push coordinated fix.

---

## Scenario 12

Remote branch deleted but visible locally.

Solution:

```bash
git fetch --prune
```

---

## Scenario 13

Need inspect remote changes without merging.

Solution:

```bash
git fetch
git diff HEAD..origin/main
```

---

## Scenario 14

Need undo latest commit but keep staged changes.

```bash
git reset --soft HEAD~1
```

---

## Scenario 15

Need undo latest local commit and edit files.

```bash
git reset HEAD~1
```

---

## Scenario 16

Need undo old shared commit.

```bash
git revert <sha>
```

---

## Scenario 17

Need compare two releases.

```bash
git diff v1.0.0..v2.0.0
git log v1.0.0..v2.0.0 --oneline
```

---

## Scenario 18

Need know exact code running in production.

Record:

```bash
git rev-parse HEAD
```

in build/deployment metadata.

---

## Scenario 19

Need temporarily inspect old code.

```bash
git switch --detach <sha>
```

---

## Scenario 20

Need parallel work on main and release branch.

```bash
git worktree
```

---

# ============================================================
# PHASE 136 — FINAL PRACTICAL CHALLENGE
# ============================================================

Complete this WITHOUT referring to notes.

1. Initialize repository.
2. Add README.
3. Commit.
4. Add application.
5. Create `.gitignore`.
6. Create feature branch.
7. Make 3 feature commits.
8. Create conflicting main change.
9. Resolve merge conflict.
10. Create another feature.
11. Rebase feature on main.
12. Interactive rebase and squash commits.
13. Cherry-pick one commit.
14. Revert another.
15. Create and recover hard reset.
16. Create stash.
17. Apply stash.
18. Add remote.
19. Push branches.
20. Fetch updates.
21. Compare local vs remote.
22. Tag release v1.0.0.
23. Create hotfix.
24. Tag v1.0.1.
25. Delete branch.
26. Recover branch via reflog.
27. Run bisect.
28. Use blame.
29. Use worktree.
30. Add submodule.
31. Create Git hook.
32. Inspect commit with cat-file.
33. Inspect tree.
34. Inspect blob.
35. Inspect index.
36. Run fsck.
37. Run gc.
38. Generate patch.
39. Apply patch.
40. Create bundle.

If you can do all forty confidently, you have strong practical Git knowledge.

---

# ============================================================
# PHASE 137 — ULTIMATE GIT CHEAT SHEET
# ============================================================

## Setup

```bash
git --version
git config --global user.name "Name"
git config --global user.email "email@example.com"
git config --list
git config --list --show-origin
```

## Repository

```bash
git init
git clone <url>
git status
```

## Stage

```bash
git add file
git add .
git add -A
git add -p
git restore --staged file
```

## Commit

```bash
git commit -m "message"
git commit -am "message"
git commit --amend
git commit --amend --no-edit
```

## Diff

```bash
git diff
git diff --staged
git diff HEAD~1 HEAD
git diff branch1..branch2
```

## History

```bash
git log
git log --oneline
git log --graph --decorate --all --oneline
git show <sha>
git blame file
```

## Branch

```bash
git branch
git branch name
git switch name
git switch -c name
git branch -d name
git branch -D name
git branch -m old new
```

## Merge

```bash
git merge branch
git merge --no-ff branch
git merge --abort
```

## Rebase

```bash
git rebase main
git rebase -i HEAD~5
git rebase --continue
git rebase --abort
git rebase --skip
```

## Undo

```bash
git restore file
git revert <sha>
git reset --soft HEAD~1
git reset HEAD~1
git reset --hard HEAD~1
```

## Stash

```bash
git stash
git stash push -m "message"
git stash list
git stash show -p
git stash apply
git stash pop
git stash drop
git stash clear
```

## Remote

```bash
git remote -v
git remote add origin <url>
git fetch
git pull
git pull --rebase
git push
git push -u origin branch
git push --force-with-lease
git fetch --prune
```

## Cherry-pick

```bash
git cherry-pick <sha>
git cherry-pick --continue
git cherry-pick --abort
```

## Tags

```bash
git tag
git tag v1.0
git tag -a v1.0 -m "release"
git push origin v1.0
git push origin --tags
```

## Recovery

```bash
git reflog
git fsck
```

## Debug

```bash
git bisect start
git bisect good
git bisect bad
git bisect reset
```

## Advanced

```bash
git worktree
git submodule
git sparse-checkout
git format-patch
git apply
git am
git bundle
git archive
git notes
```

## Internals

```bash
git rev-parse HEAD
git cat-file -t HEAD
git cat-file -p HEAD
git ls-tree HEAD
git ls-files --stage
git show-ref
git symbolic-ref HEAD
git merge-base branch1 branch2
git rev-list HEAD
git hash-object file
git gc
git fsck
git count-objects -v
```

---

# ============================================================
# PHASE 138 — COMMAND RELATIONSHIP MAP
# ============================================================

```text
                    REMOTE
                       ^
                       |
                     push
                       |
                       |
fetch/pull             |
     |                 |
     v                 |
LOCAL REPOSITORY -------

        ^
        |
      commit
        |
        |
   STAGING AREA
        ^
        |
       add
        |
        |
WORKING DIRECTORY
```

Undo direction:

```text
Working Directory
      ^
      |
   restore


Staging Area
      ^
      |
restore --staged


Commit History
      |
      +--> reset
      |
      +--> revert
```

---

# ============================================================
# PHASE 139 — MERGE/REBASE VISUAL MEMORY
# ============================================================

Before:

```text
A---B---C main
     \
      D---E feature
```

MERGE:

```text
A---B---C------M
     \        /
      D------E
```

REBASE:

```text
A---B---C---D'---E'
```

Remember:

```text
MERGE = combine histories

REBASE = rewrite base/history
```

---

# ============================================================
# PHASE 140 — RESET VISUAL MEMORY
# ============================================================

Before:

```text
A---B---C
        ^
       HEAD
```

Soft:

```text
A---B
    ^
   HEAD

C changes remain staged.
```

Mixed:

```text
A---B
    ^
   HEAD

C changes remain unstaged.
```

Hard:

```text
A---B
    ^
   HEAD

C tracked working changes are discarded.
```

---

# ============================================================
# PHASE 141 — GOLDEN GIT RULES
# ============================================================

1. Commit small logical changes.

2. Write meaningful commit messages.

3. Pull/fetch regularly.

4. Never commit credentials.

5. Protect main/master.

6. Use feature branches.

7. Review before committing:

```bash
git diff
git diff --staged
```

8. Review before pushing:

```bash
git log origin/main..HEAD
```

9. Prefer:

```bash
git push --force-with-lease
```

over:

```bash
git push --force
```

10. Do not casually rebase public/shared history.

11. Prefer revert for shared production commits.

12. Learn reflog.

13. Preview clean:

```bash
git clean -n
```

14. Never blindly use:

```bash
git reset --hard
```

15. Tag releases.

16. Keep build artifacts outside normal source history.

17. Configure `.gitignore` correctly.

18. Use `.gitattributes` for cross-platform consistency.

19. Integrate security scans into PR/CI workflow.

20. Maintain traceability:

```text
Requirement
  ↓
Branch
  ↓
Commit
  ↓
Pull Request
  ↓
Build
  ↓
Artifact
  ↓
Deployment
```

---

# ============================================================
# PHASE 142 — WHAT A 9-YEAR ENGINEER SHOULD BE ABLE TO EXPLAIN
# ============================================================

A senior engineer should not merely know:

```bash
git add
git commit
git push
```

They should confidently explain:

```text
Why Git is distributed.

How Git stores snapshots.

How objects work.

HEAD and refs.

Index/staging internals.

Fast-forward vs three-way merge.

Merge base.

Merge vs rebase.

Interactive rebase.

Rebase conflicts.

Cherry-picking production fixes.

Revert vs reset.

Soft/mixed/hard reset.

Reflog recovery.

Detached HEAD.

Remote-tracking branches.

Fetch vs pull.

Force-with-lease.

Branching strategies.

GitFlow vs trunk-based development.

Release/hotfix strategy.

Protected branches.

Tagging/versioning.

Git hooks.

Git in CI/CD.

Bisect debugging.

Worktrees.

Submodules.

Sparse/shallow/partial clones.

Git LFS.

Secrets/history cleanup.

Git objects:
blob/tree/commit/tag.

cat-file.

rev-parse.

merge-base.

rev-list.

Repository recovery.

Production rollback strategy.
```

Most importantly, a senior engineer should be able to explain:

```text
WHY a command is being used,
WHAT it changes internally,
WHAT risks it introduces,
and HOW to recover if it goes wrong.
```

That is what distinguishes command memorization from real Git expertise.

---

# ============================================================
# FINAL PROJECT SUCCESS CRITERIA
# ============================================================

You have completed Git Mastery Lab when you can perform this entire lifecycle:

```text
Initialize
    ↓
Develop
    ↓
Stage
    ↓
Commit
    ↓
Branch
    ↓
Collaborate
    ↓
Fetch
    ↓
Rebase/Merge
    ↓
Resolve Conflict
    ↓
Push
    ↓
PR
    ↓
CI/CD
    ↓
Tag
    ↓
Release
    ↓
Hotfix
    ↓
Revert
    ↓
Recover
    ↓
Debug
    ↓
Inspect Git Internals
```

At that point your Git knowledge covers essentially all major areas expected in:

- Developer interviews
- DevOps interviews
- SRE interviews
- Cloud/Platform Engineering interviews
- Senior DevOps interviews
- Lead DevOps interviews
- CI/CD interviews
- Release Engineering interviews
- Git troubleshooting rounds
- System/production scenario rounds

The next best way to execute this is NOT to read everything once.

Implement the project phase-by-phase and intentionally break Git history along the way.

Recommended learning order:

```text
DAY 1
Phases 1-15
Fundamentals

DAY 2
Phases 16-30
Branches + Merge + Rebase + Reset + Stash

DAY 3
Phases 31-45
Tags + Remotes + Collaboration + Log

DAY 4
Phases 46-64
Debugging + Advanced Git

DAY 5
Phases 65-75
Git Internals

DAY 6
Phases 76-93
Security + Production + Advanced workflows

DAY 7
Phases 94-117
Troubleshooting + Release Engineering

DAY 8
Phases 118-133
CI/CD + Senior scenarios

DAY 9
Phases 134-141
Interview questions + practical challenges

DAY 10
Repeat entire project WITHOUT NOTES.
```

# END OF GIT MASTERY LAB