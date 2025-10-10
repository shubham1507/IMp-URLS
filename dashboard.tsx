import Popover from "@mui/material/Popover";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";


const [roleMenu, setRoleMenu] = useState({ anchorEl: null, rowId: null });

const openRoleMenu = (event, rowId) => {
  setRoleMenu({ anchorEl: event.currentTarget, rowId });
};
const closeRoleMenu = () => setRoleMenu({ anchorEl: null, rowId: null });



<TableCell>
  <Button
    size="small"
    variant="outlined"
    onClick={(e) => openRoleMenu(e, r.id)}
  >
    Role: {r.roleName ?? "Select"}
  </Button>
</TableCell>


<Popover
  open={Boolean(roleMenu.anchorEl)}
  anchorEl={roleMenu.anchorEl}
  onClose={closeRoleMenu}
  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
  transformOrigin={{ vertical: "top", horizontal: "left" }}
  PaperProps={{ sx: { borderRadius: 2, minWidth: 360 } }}
>
  <MenuList dense sx={{ p: 1 }}>
    {roles.map((role) => {
      const row = rows.find((x) => x.id === roleMenu.rowId);
      const selected = row?.roleId === role.id;

      const handleSelect = () => {
        // update row immediately (no Save/Cancel)
        setRows((prev) =>
          prev.map((x) =>
            x.id === roleMenu.rowId
              ? {
                  ...x,
                  roleId: role.id,
                  roleName: prettyName(role.name),
                }
              : x
          )
        );
        closeRoleMenu();
      };

      return (
        <MenuItem
          key={role.id}
          onClick={handleSelect}
          sx={{ alignItems: "flex-start", py: 1 }}
        >
          <ListItemIcon sx={{ minWidth: 28, mt: "2px" }}>
            {selected ? <CheckIcon fontSize="small" /> : null}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {prettyName(role.name)}
              </Typography>
            }
            secondary={
              <Typography variant="caption" color="text.secondary">
                {role.description}
              </Typography>
            }
          />
        </MenuItem>
      );
    })}
  </MenuList>
</Popover>
