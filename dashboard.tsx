import React, { useState } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
  CircularProgress,
  Drawer,
  IconButton,
  CssBaseline,
  Divider,
  Switch,
  FormControlLabel,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const drawerWidth = 240;

type ViewType = 'projectForm' | 'addUser' | 'viewUser';

const Dashboard: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [view, setView] = useState<ViewType>('projectForm');

  const [qcId, setQcId] = useState('');
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkAlert, setCheckAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [staffId, setStaffId] = useState<string | null>(null);
  const [domainsData, setDomainsData] = useState<{ domain_name: string; unique_projects: string[] }[]>([]);
  const [domain, setDomain] = useState('');
  const [project, setProject] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitAlert, setSubmitAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [existingUser, setExistingUser] = useState(false);
  const [staffIdInput, setStaffIdInput] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [qcUserId, setQcUserId] = useState('');

  const [searchMode, setSearchMode] = useState<'qcId' | 'staffId'>('qcId');
  const [searchInput, setSearchInput] = useState('');
  const [userDetails, setUserDetails] = useState<null | {
    name: string;
    email: string;
    qcId: string;
    staffId: string;
  }>(null);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const checkQCID = async () => {
    if (!qcId.trim()) {
      setCheckAlert({ type: 'error', message: 'Please enter a QC ID.' });
      return;
    }

    try {
      setCheckLoading(true);
      setCheckAlert(null);
      setDomainsData([]);
      setDomain('');
      setProject('');

      const staffRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/access/staff-id`, {
        params: { qc_user_name: qcId },
        headers: { 'x-api-key': import.meta.env.VITE_API_KEY, 'accept': 'application/json' },
      });

      const staff_id = staffRes.data?.staff_id;
      if (!staff_id) throw new Error('No staff ID found');
      setStaffId(staff_id);

      const domainRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/access/domains-projects`, {
        params: { staff_id },
        headers: { 'x-api-key': import.meta.env.VITE_API_KEY, 'accept': 'application/json' },
      });

      if (Array.isArray(domainRes.data)) {
        setDomainsData(domainRes.data);
        setCheckAlert({ type: 'success', message: '✅ User exists and domain/project loaded.' });
      } else {
        throw new Error('Invalid domain/project response');
      }
    } catch (err) {
      console.error(err);
      setCheckAlert({ type: 'error', message: '❌ QC ID invalid or no domain/project found.' });
    } finally {
      setCheckLoading(false);
    }
  };

  const renderProjectForm = () => (
    <Box>
      <Typography variant="h5" gutterBottom>Domain Project Form</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <TextField label="QC ID" value={qcId} onChange={(e) => setQcId(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))} placeholder="Enter QC ID" />
        <Button variant="outlined" onClick={checkQCID} disabled={checkLoading}>{checkLoading ? <CircularProgress size={20} /> : 'Check'}</Button>
      </Box>
      {checkAlert && <Alert severity={checkAlert.type} sx={{ mb: 2 }}>{checkAlert.message}</Alert>}
      <FormControl fullWidth sx={{ mb: 2 }} disabled={domainsData.length === 0}>
        <InputLabel>Domain Name</InputLabel>
        <Select value={domain} label="Domain Name" onChange={(e) => { setDomain(e.target.value); setProject(''); }}>
          {domainsData.map((d) => <MenuItem key={d.domain_name} value={d.domain_name}>{d.domain_name}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }} disabled={!domain}>
        <InputLabel>Project Name</InputLabel>
        <Select value={project} label="Project Name" onChange={(e) => setProject(e.target.value)}>
          {(domainsData.find(d => d.domain_name === domain)?.unique_projects || []).map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={() => setSubmitAlert({ type: 'success', message: 'Submitted!' })} disabled={!qcId || !domain || !project}>
        {submitLoading ? <CircularProgress size={24} /> : 'Submit'}
      </Button>
      {submitAlert && <Alert severity={submitAlert.type} sx={{ mt: 2 }}>{submitAlert.message}</Alert>}
    </Box>
  );

  const renderAddUserForm = () => (
    <Box>
      <Typography variant="h5" gutterBottom>Add User</Typography>
      <FormControlLabel control={<Switch checked={existingUser} onChange={() => setExistingUser(!existingUser)} />} label="Existing User" sx={{ mb: 2 }} />
      <TextField fullWidth label="Staff ID" value={staffIdInput} onChange={(e) => setStaffIdInput(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="QC User Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="QC ID" value={qcUserId} onChange={(e) => setQcUserId(e.target.value)} sx={{ mb: 2 }} />
      <Button variant="contained" onClick={() => alert('User submitted')}>Submit</Button>
    </Box>
  );

  const renderViewUser = () => (
    <Box>
      <Typography variant="h5" gutterBottom>View User</Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Search Mode</InputLabel>
        <Select value={searchMode} label="Search Mode" onChange={(e) => setSearchMode(e.target.value as 'qcId' | 'staffId')}>
          <MenuItem value="qcId">Search by QC ID</MenuItem>
          <MenuItem value="staffId">Search by Staff ID</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth label={searchMode === 'qcId' ? 'QC ID' : 'Staff ID'} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} sx={{ mb: 2 }} />
      <Button variant="contained" onClick={() => {
        setUserDetails({
          name: 'Alice Copper',
          email: 'acopper@hsbc.com',
          qcId: 'acopper_12345678',
          staffId: '12345678'
        });
      }}>Search</Button>
      {userDetails && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1"><strong>Name:</strong> {userDetails.name}</Typography>
          <Typography variant="subtitle1"><strong>Email Address:</strong> {userDetails.email}</Typography>
          <Typography variant="subtitle1"><strong>QC ID:</strong> {userDetails.qcId}</Typography>
          <Typography variant="subtitle1"><strong>Staff ID:</strong> {userDetails.staffId}</Typography>
        </Box>
      )}
    </Box>
  );

  const drawer = (
    <Box sx={{ p: 2, height: '100%', bgcolor: '#f4f6f8' }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Admin Console</Typography>
      <Divider />
      <List>
        <ListItemButton selected={view === 'addUser'} onClick={() => setView('addUser')}>
          <ListItemIcon><PersonAddIcon /></ListItemIcon>
          <ListItemText primary="Add User" />
        </ListItemButton>
        <ListItemButton selected={view === 'viewUser'} onClick={() => setView('viewUser')}>
          <ListItemIcon><VisibilityIcon /></ListItemIcon>
          <ListItemText primary="View User" />
        </ListItemButton>
        <ListItemButton disabled>
          <ListItemIcon><AddBoxIcon /></ListItemIcon>
          <ListItemText primary="Add Project" />
        </ListItemButton>
        <ListItemButton disabled>
          <ListItemIcon><FolderOpenIcon /></ListItemIcon>
          <ListItemText primary="View Project" />
        </ListItemButton>
        <ListItemButton selected={view === 'projectForm'} onClick={() => setView('projectForm')}>
          <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
          <ListItemText primary="Project Form" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>Admin Console</Typography>
          <Button color="inherit" onClick={() => { localStorage.clear(); window.location.href = '/'; }}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="navigation">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}>
        {view === 'projectForm' ? renderProjectForm() : view === 'addUser' ? renderAddUserForm() : renderViewUser()}
      </Box>
    </Box>
  );
};

export default Dashboard;
