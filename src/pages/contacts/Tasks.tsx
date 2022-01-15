import {
  DateField,
  useTranslate,
  Record,
  Identifier,
  useDelete,
  useResourceContext,
  useNotify,
  useUpdate,
  useRefresh,
} from "react-admin";
import {
  Box,
  Typography,
  ListItem,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/BrushRounded";
import DeleteIcon from "@material-ui/icons/ClearRounded";
import { useState } from "react";
import moment, { Moment } from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import RoundButton from "../../components/RoundButton";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

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

const Tasks = ({ id, task }: { id: Identifier; task: Record }) => {
  const translate = useTranslate();
  const [isHover, setHover] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newTaskColor, setNewTaskColor] = useState(colors[0]);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());
  const resource = useResourceContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const [update] = useUpdate();

  const handleOpenEditDialog = () => {
    setOpen(true);
    setDisabled(false);
    setNewTask(task.text);
    setSelectedDate(task.due_date);
    setNewTaskColor(task.color);
  };

  const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleDateChange = (moment: Moment | null) => {
    setSelectedDate(moment);
  };

  const handleUpdateTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    update(
      resource,
      id,
      { text: newTask, color: newTaskColor, due_date: selectedDate },
      task,
      {
        onSuccess: () => {
          setOpen(false);
          refresh();
        },
      }
    );
  };

  const [handleDelete] = useDelete(resource, id, task, {
    mutationMode: "undoable",
    onSuccess: () => {
      notify(translate("ra.tasks.taskDeleted"), {
        type: "info",
        undoable: true,
      });
    },
  });

  return (
    <ListItem disableGutters>
      <Box
        bgcolor={task.color}
        padding="10px"
        borderRadius="10px"
        flex={1}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Box>
          <Typography variant="body2">{task.text}</Typography>
          <Box>
            <Box
              display="flex"
              position="absolute"
              right="0"
              style={{ visibility: isHover ? "visible" : "hidden" }}
            >
              <Tooltip title={translate("ra.tasks.editTask")}>
                <IconButton size="small" onClick={handleOpenEditDialog}>
                  <EditIcon style={{ fill: "#3a9bdc" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title={translate("ra.tasks.deleteTasks")}>
                <IconButton size="small" onClick={handleDelete}>
                  <DeleteIcon style={{ fill: "#DC143C" }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="body2" color="textSecondary">
              {translate("ra.misc.due")}{" "}
              <DateField locales="fa-IR" source="due_date" record={task} />
            </Typography>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="sm"
      >
        <form onSubmit={handleUpdateTask}>
          <DialogTitle id="form-dialog-title">
            {translate("ra.tasks.editTask")}
          </DialogTitle>
          <DialogContent>
            <TextField
              multiline
              rows={3}
              maxRows={10}
              label={translate("ra.tasks.task")}
              fullWidth
              value={newTask}
              onChange={handleNewTaskChange}
            />
            <Box mt={2}>
              <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                <DatePicker
                  margin="normal"
                  disableToolbar
                  variant="inline"
                  minDateMessage={translate("ra.date.minDateMessage")}
                  label={translate("ra.date.dueDate")}
                  labelFunc={(date) =>
                    date ? date.format("jYYYY/jMM/jDD") : ""
                  }
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e)}
                />
              </MuiPickersUtilsProvider>
            </Box>
            <Box display="flex" flexWrap="wrap" width={230} mt={2} m="0 auto">
              {colors.map((color) => (
                <RoundButton
                  key={color}
                  color={color}
                  selected={color === newTaskColor}
                  handleClick={() => {
                    setNewTaskColor(color);
                  }}
                />
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              {translate("ra.actions.cancel")}
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={!newTask || disabled}
            >
              {translate("ra.action.edit")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </ListItem>
  );
};

export default Tasks;
