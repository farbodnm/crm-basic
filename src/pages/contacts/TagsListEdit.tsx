import { useState, FormEvent } from "react";
import {
  useGetMany,
  useCreate,
  useUpdate,
  useGetList,
  Identifier,
  useTranslate,
} from "react-admin";
import {
  Chip,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Menu,
} from "@material-ui/core";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EditIcon from "@mui/icons-material/Edit";

import { Contact } from "../../utils/types";
import RoundButton from "../../components/RoundButton";

const colors = [
  "#eddcd2",
  "#fff1e6",
  "#fde2e4",
  "#fad2e1",
  "#c5dedd",
  "#dbe7e4",
  "#f0efeb",
  "#d6e2e9",
  "#bcd4e6",
  "#99c1de",
];

export const TagsListEdit = ({ record }: { record: Contact }) => {
  const translate = useTranslate();
  const [open, setOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState(colors[0]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [version, setVersion] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const { data: allTags, ids } = useGetList(
    "tags",
    { page: 1, perPage: 10 },
    { field: "name", order: "ASC" },
    {},
    { version } as any // @FIXME UseDataProviderOptions don't allow [key: string]: any
  );
  // const { data: tags, loaded } = useGetMany("tags", record.tags, {
  //   enabled: record.tags && record.tags.length > 0,
  // });
  const { data: tags } = useGetMany("tags", record.tags, {
    enabled: record.tags && record.tags.length > 0,
  });
  const [update] = useUpdate();
  const [create] = useCreate();

  const unselectedTagIds = ids && ids.filter((id) => !record.tags.includes(id));

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTag = (id: Identifier) => {
    const tags: Identifier[] = record.tags.filter(
      (tagId: Identifier) => tagId !== id
    );
    update("contacts", record.id, { tags }, record);
  };

  const handleAddTag = (id: Identifier) => {
    const tags: Identifier[] = [...record.tags, id];
    update("contacts", record.id, { tags }, record);
    setAnchorEl(null);
  };

  const handleOpenCreateDialog = () => {
    setOpen(true);
    setAnchorEl(null);
    setDisabled(false);
  };

  const handleNewTagNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTagName(event.target.value);
  };

  const handleCreateTag = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    create(
      "tags",
      { name: newTagName, color: newTagColor },
      {
        onSuccess: ({ data }) => {
          update(
            "contacts",
            record.id,
            { tags: [...record.tags, data.id] },
            record,
            {
              onSuccess: () => {
                setNewTagName("");
                setNewTagColor(colors[0]);
                setOpen(false);

                setVersion((v) => v + 1);
              },
            }
          );
        },
      }
    );
  };

  // if (!loaded) return null;
  return (
    <>
      {tags && (
        <>
          {tags.map((tag) => (
            <Box mt={1} mb={1} key={tag.id}>
              <Chip
                size="small"
                variant="outlined"
                onDelete={() => handleDeleteTag(tag.id)}
                label={tag.name}
                style={{ backgroundColor: tag.color, border: 0 }}
              />
            </Box>
          ))}
        </>
      )}
      <Box mt={1}>
        <Chip
          icon={<ControlPointIcon />}
          size="small"
          variant="outlined"
          onClick={handleOpen}
          label={translate("ra.tags.addTag")}
          color="primary"
        />
      </Box>
      <Menu open={Boolean(anchorEl)} onClose={handleClose} anchorEl={anchorEl}>
        {unselectedTagIds?.map((id) => (
          <MenuItem key={id} onClick={() => handleAddTag(id)}>
            <Chip
              size="small"
              variant="outlined"
              label={allTags && allTags[id].name}
              style={{
                backgroundColor: allTags && allTags[id].color,
                border: 0,
              }}
              onClick={() => handleAddTag(id)}
            />
          </MenuItem>
        ))}
        <MenuItem onClick={handleOpenCreateDialog}>
          <Chip
            icon={<EditIcon />}
            size="small"
            variant="outlined"
            onClick={handleOpenCreateDialog}
            color="primary"
            label={translate("ra.tags.createNewTag")}
          />
        </MenuItem>
      </Menu>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleCreateTag}>
          <DialogTitle id="form-dialog-title">
            {translate("ra.tags.createNewTag")}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              label={translate("ra.tags.tagName")}
              fullWidth
              value={newTagName}
              onChange={handleNewTagNameChange}
            />
            <Box display="flex" flexWrap="wrap" width={230} mt={2}>
              {colors.map((color) => (
                <RoundButton
                  key={color}
                  color={color}
                  selected={color === newTagColor}
                  handleClick={() => {
                    setNewTagColor(color);
                  }}
                />
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              {translate("ra.actions.cancel")}
            </Button>
            <Button type="submit" color="primary" disabled={disabled}>
              {translate("ra.tags.addTag")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
