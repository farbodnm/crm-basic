import {
  DateField,
  useListContext,
  useTranslate,
  useCreate,
  useUpdate,
  useRefresh,
} from "react-admin";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useState } from "react";
import moment, { Moment } from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { Contact } from "../../utils/types";
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

const TasksIterator = ({ record }: { record: Contact }) => {
  const translate = useTranslate();
  const { data, ids, loading } = useListContext();
  const [newTask, setNewTask] = useState("");
  const [newTaskColor, setNewTaskColor] = useState(colors[0]);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());
  const [create] = useCreate();
  const refresh = useRefresh();

  const handleOpenCreateDialog = () => {
    setOpen(true);
    setDisabled(false);
  };

  const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleDateChange = (moment: Moment | null) => {
    setSelectedDate(moment);
  };

  const handleCreateTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    create(
      "tasks",
      {
        text: newTask,
        color: newTaskColor,
        contact_id: record.id,
        due_date: selectedDate,
      },
      {
        onSuccess: () => {
          setNewTask("");
          setNewTaskColor(colors[0]);
          setSelectedDate(moment());
          setOpen(false);
          refresh();
        },
      }
    );
  };

  if (loading) return null;
  return (
    <Box marginBottom={2}>
      <Typography variant="subtitle2">
        {translate("ra.contacts.tasks")}
      </Typography>
      <Divider />
      <List>
        {ids.map((id) => {
          const task = data[id];
          return (
            <ListItem key={id} disableGutters>
              <Box bgcolor={task.color} padding="10px" borderRadius="10px">
                <Typography variant="body2">{task.text}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {translate("ra.misc.due")}{" "}
                  <DateField locales="fa-IR" source="due_date" record={task} />
                </Typography>
              </Box>
            </ListItem>
          );
        })}
      </List>
      <Chip
        icon={<ControlPointIcon />}
        size="small"
        variant="outlined"
        onClick={handleOpenCreateDialog}
        color="primary"
        label={translate("ra.tasks.addTask")}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="sm"
      >
        <form onSubmit={handleCreateTask}>
          <DialogTitle id="form-dialog-title">
            {translate("ra.tasks.createNewTask")}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              multiline
              rows={5}
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
            <Button type="submit" color="primary" disabled={disabled}>
              {translate("ra.tasks.addTask")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default TasksIterator;
