import {Fragment, useState, useEffect} from "react";
import type {Employee, EmployeeRole, Team} from "../types/Employee";
import {
  Box,
  Button,
  Chip,
  Collapse,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  MenuItem
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {employeeService} from "../services/employeeService.ts";

interface EmployeeTableProps {
  employees: Employee[];
  onDelete: (id: number) => void;
  onUpdateEmployee: (employeeId: number, employee: {
    name: string;
    role: EmployeeRole | undefined;
    team: Team | undefined;
  }) => Promise<void>;
  onUpdateSkills: (employeeId: number, skills: string[]) => Promise<void>;
}

const normalizeSkillNames = (names: string[]) => {
  const seen = new Set<string>();
  const normalized: string[] = [];

  for (const name of names) {
    const trimmed = name.trim();
    if (!trimmed) {
      continue;
    }

    const key = trimmed.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    normalized.push(trimmed);
  }

  return normalized;
};

const chipLikeInputSx = {
  minWidth: 132,
  "& .MuiInputBase-root": {
    height: 32,
    borderRadius: 16,
    fontSize: "0.875rem"
  },
  "& .MuiInputBase-input": {
    py: 0,
    px: 0,
    textAlign: 'center'
  }
};

const chipLikeButtonSx = {
  height: 32,
  minHeight: 32,
  borderRadius: 16,
  pl: 1.5,
  pr: 2,
  textTransform: "none",
  whiteSpace: "nowrap",
  color: "primary.main",
};

const chipLikeIconButtonSx = {
  width: 24,
  height: 24,
  p: 0,
  ml: 0.5,
  flexShrink: 0,
  alignSelf: "center",
  "& .MuiSvgIcon-root": {
    fontSize: "1rem"
  }
};

const plainIconButtonSx = {
  width: 24,
  height: 24,
  p: 0,
  flexShrink: 0,
  ml: 0.5,
  "& .MuiSvgIcon-root": {
    fontSize: "1rem"
  }
};

const menuItemSx = {
  bgcolor: 'primary.dark',
  color: 'primary.contrastText',

  '&.Mui-selected': {
    bgcolor: 'secondary.main',
    color: 'secondary.contrastText',
  },

  '&.Mui-selected:hover': {
    bgcolor: 'secondary.main',
  },

  '&:hover': {
    bgcolor: 'action.hover',
  },
};

const slotProps = {
  select: {
    MenuProps: {
      slotProps: {
        paper: {
          sx: {
            maxHeight: 48 * 4,

            bgcolor: 'primary.main',
            '& .MuiMenuItem-root': {
              color: 'primary.contrastText',
            },
            '& .MuiMenuItem-root:hover': {
              bgcolor: 'primary.darker',
            },
            '& .Mui-selected': {
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText'
            },
          },
        },
      },
    },
  },
};

export default function EmployeeTable({
                                        employees,
                                        onDelete,
                                        onUpdateEmployee,
                                        onUpdateSkills
                                      }: EmployeeTableProps) {
  const [manuallyExpandedEmployeeIds, setManuallyExpandedEmployeeIds] = useState<Set<number>>(new Set());
  const [manuallyCollapsedEmployeeIds, setManuallyCollapsedEmployeeIds] = useState<Set<number>>(new Set());

  const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null);
  const [editingEmployeeName, setEditingEmployeeName] = useState("");
  const [editingEmployeeRole, setEditingEmployeeRole] = useState("");
  const [editingEmployeeTeam, setEditingEmployeeTeam] = useState("");
  const [editingEmployeeOriginalName, setEditingEmployeeOriginalName] = useState("");
  const [editingEmployeeOriginalRole, setEditingEmployeeOriginalRole] = useState("");
  const [editingEmployeeOriginalTeam, setEditingEmployeeOriginalTeam] = useState("");

  const [editingSkillsEmployeeId, setEditingSkillsEmployeeId] = useState<number | null>(null);
  const [draftSkillNames, setDraftSkillNames] = useState<string[]>([]);
  const [originalSkillNames, setOriginalSkillNames] = useState<string[]>([]);
  const [editingSkillKey, setEditingSkillKey] = useState<string | null>(null);
  const [editingSkillDraft, setEditingSkillDraft] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const list = await employeeService.getTeams();
        if (mounted) setTeams(list);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err : unknown) {
        console.error('err occurred while fetching teams');
      }
    })();

    return () => { mounted = false; };
  }, []);

  const [roles, setRoles] = useState<EmployeeRole[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const list = await employeeService.getEmployeeRoles();
        if (mounted) setRoles(list);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err : unknown) {
        console.error('err occurred while fetching teams');
      }
    })();

    return () => { mounted = false; };
  }, []);

  const isExpanded = (employee: Employee) => {
    const hasSkills = (employee.skills ?? []).length > 0;

    if (hasSkills) {
      return !manuallyCollapsedEmployeeIds.has(employee.id);
    }

    return manuallyExpandedEmployeeIds.has(employee.id);
  };

  const toggleExpanded = (employee: Employee) => {
    const hasSkills = (employee.skills ?? []).length > 0;

    if (hasSkills) {
      setManuallyCollapsedEmployeeIds(current => {
        const next = new Set(current);

        if (next.has(employee.id)) {
          next.delete(employee.id);
        } else {
          next.add(employee.id);
        }

        return next;
      });
      setManuallyExpandedEmployeeIds(current => {
        const next = new Set(current);
        next.delete(employee.id);
        return next;
      });
      return;
    }

    setManuallyExpandedEmployeeIds(current => {
      const next = new Set(current);

      if (next.has(employee.id)) {
        next.delete(employee.id);
      } else {
        next.add(employee.id);
      }

      return next;
    });
  };

  const beginEmployeeEdit = (employee: Employee) => {
    setEditingEmployeeId(employee.id);
    setEditingEmployeeName(employee.name);
    setEditingEmployeeRole(employee.role?.role ?? "");
    setEditingEmployeeTeam(employee.team?.team ?? "");
    setEditingEmployeeOriginalName(employee.name);
    setEditingEmployeeOriginalRole(employee.role?.role ?? "");
    setEditingEmployeeOriginalTeam(employee.team?.team ?? "");
    setEditingSkillsEmployeeId(null);
    setDraftSkillNames([]);
    setOriginalSkillNames([]);
    setEditingSkillKey(null);
    setEditingSkillDraft("");
    setNewSkill("");
  };

  const confirmEmployeeEdit = async (employee: Employee) => {
    if (!isEmployeeEditValid()) {
      return;
    }

    const nextName = editingEmployeeName.trim();
    const nextRole = editingEmployeeRole.trim();
    const nextTeam = editingEmployeeTeam.trim();
    const originalName = editingEmployeeOriginalName.trim();
    const originalRole = editingEmployeeOriginalRole.trim();
    const originalTeam = editingEmployeeOriginalTeam.trim();

    if (nextName === originalName && nextRole === originalRole && nextTeam === originalTeam) {
      setEditingEmployeeId(null);
      setEditingEmployeeName("");
      setEditingEmployeeRole("");
      setEditingEmployeeTeam("");
      setEditingEmployeeOriginalName("");
      setEditingEmployeeOriginalRole("");
      setEditingEmployeeOriginalTeam("");
      return;
    }

    const roleObj = nextRole ? roles.find(r => r.role === nextRole) : undefined;
    const teamObj = nextTeam ? teams.find(t => t.team === nextTeam) : undefined;
    await onUpdateEmployee(employee.id, {
      name: nextName,
      role: roleObj,
      team: teamObj
    });

    setEditingEmployeeId(null);
    setEditingEmployeeName("");
    setEditingEmployeeRole("");
    setEditingEmployeeOriginalName("");
    setEditingEmployeeOriginalRole("");
    setEditingEmployeeOriginalTeam("");
  };

  const cancelEmployeeEdit = () => {
    setEditingEmployeeId(null);
    setEditingEmployeeName("");
    setEditingEmployeeRole("");
    setEditingEmployeeOriginalName("");
    setEditingEmployeeOriginalRole("");
    setEditingEmployeeOriginalTeam("");
  };

  const beginSkillEdit = (employee: Employee) => {
    const skillNames = normalizeSkillNames((employee.skills ?? []).map(skill => skill.skillName));
    setEditingSkillsEmployeeId(employee.id);
    setDraftSkillNames(skillNames);
    setOriginalSkillNames(skillNames);
    setEditingSkillKey(null);
    setEditingSkillDraft("");
    setNewSkill("");
    setEditingEmployeeId(null);
    setEditingEmployeeName("");
    setEditingEmployeeRole("");
    setEditingEmployeeOriginalName("");
    setEditingEmployeeOriginalRole("");
    setEditingEmployeeOriginalTeam("");
    if ((employee.skills ?? []).length > 0 && manuallyCollapsedEmployeeIds.has(employee.id)) {
      toggleExpanded(employee);
    }
  };

  const commitInlineSkillEdit = () => {
    if (!editingSkillKey) {
      return draftSkillNames;
    }

    const next = draftSkillNames.filter(skill => skill.toLowerCase() !== editingSkillKey.toLowerCase());
    const trimmed = editingSkillDraft.trim();

    if (trimmed) {
      next.push(trimmed);
    }

    return normalizeSkillNames(next);
  };

  const startChipEdit = (skillName: string) => {
    setDraftSkillNames(current => {
      return editingSkillKey
        ? normalizeSkillNames(
          current
            .filter(skill => skill.toLowerCase() !== editingSkillKey.toLowerCase())
            .concat(editingSkillDraft.trim() ? [editingSkillDraft.trim()] : [])
        )
        : current;
    });
    setEditingSkillKey(skillName);
    setEditingSkillDraft(skillName);
  };

  const deleteSkill = (skillName: string) => {
    setDraftSkillNames(current => current.filter(skill => skill.toLowerCase() !== skillName.toLowerCase()));
    if (editingSkillKey?.toLowerCase() === skillName.toLowerCase()) {
      setEditingSkillKey(null);
      setEditingSkillDraft("");
    }
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();

    if (!trimmed) {
      setNewSkill("");
      return;
    }

    const next = normalizeSkillNames([...draftSkillNames, trimmed]);
    setDraftSkillNames(next);
    setNewSkill("");
  };

  const isEmployeeEditValid = () =>
    editingEmployeeName.trim().length >= 3 &&
    editingEmployeeRole.trim().length >= 2 &&
    editingEmployeeTeam.trim().length >= 3;

  const confirmSkills = async (employee: Employee) => {
    const committedSkills = normalizeSkillNames([
      ...commitInlineSkillEdit(),
      newSkill.trim()
    ]);

    const originalSkills = normalizeSkillNames(originalSkillNames);

    if (
      committedSkills.length === originalSkills.length &&
      committedSkills.every((skill, index) => skill.toLowerCase() === originalSkills[index]?.toLowerCase())
    ) {
      setEditingSkillsEmployeeId(null);
      setDraftSkillNames([]);
      setOriginalSkillNames([]);
      setEditingSkillKey(null);
      setEditingSkillDraft("");
      setNewSkill("");
      return;
    }

    await onUpdateSkills(employee.id, committedSkills);

    setEditingSkillsEmployeeId(null);
    setDraftSkillNames([]);
    setOriginalSkillNames([]);
    setEditingSkillKey(null);
    setEditingSkillDraft("");
    setNewSkill("");
  };

  const cancelSkillsEdit = () => {
    setEditingSkillsEmployeeId(null);
    setDraftSkillNames([]);
    setOriginalSkillNames([]);
    setEditingSkillKey(null);
    setEditingSkillDraft("");
    setNewSkill("");
  };

  const renderSkillContent = (employee: Employee) => {
    const employeeBeingEdited = editingSkillsEmployeeId === employee.id;

    const skillNames = employeeBeingEdited
      ? draftSkillNames
      : normalizeSkillNames(
        (employee.skills ?? []).map(skill => skill.skillName)
      );

    return (
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 8
          }}
        >
          {/*skill chip box*/}
          <Box sx={{flex: 1, minWidth: 0}}>
            {skillNames.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No skills added
              </Typography>
            ) : (
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{
                  flexWrap: "wrap",
                  alignItems: "center"
                }}
              >
                {skillNames.map(skill => {
                  const isChipBeingEdited =
                    employeeBeingEdited &&
                    editingSkillKey?.toLowerCase() === skill.toLowerCase();

                  if (isChipBeingEdited) {
                    return (
                      <Box
                        key={skill}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.5,
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 16,
                          pl: 1,
                          pr: 0.5,
                          minHeight: 32
                        }}
                      >
                        <TextField
                          value={editingSkillDraft}
                          onChange={e =>
                            setEditingSkillDraft(e.target.value)
                          }
                          variant="standard"
                          size="small"
                          autoFocus
                          placeholder="Skill"
                          slotProps={{
                            input: {
                              disableUnderline: true
                            }
                          }}
                          onBlur={() => {
                            const next = commitInlineSkillEdit();
                            setDraftSkillNames(next);
                            setEditingSkillKey(null);
                            setEditingSkillDraft("");
                          }}
                          onKeyDown={e => {
                            if (e.key === "Enter") {
                              e.preventDefault();

                              const next = commitInlineSkillEdit();

                              setDraftSkillNames(next);
                              setEditingSkillKey(null);
                              setEditingSkillDraft("");
                            }

                            if (e.key === "Escape") {
                              e.preventDefault();

                              setEditingSkillKey(null);
                              setEditingSkillDraft("");
                            }
                          }}
                          sx={chipLikeInputSx}
                        />

                        <IconButton
                          size="small"
                          onClick={() => deleteSkill(skill)}
                          sx={chipLikeIconButtonSx}
                        >
                          <DeleteIcon fontSize="small"/>
                        </IconButton>
                      </Box>
                    );
                  }

                  return (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      variant="outlined"
                      clickable={employeeBeingEdited}
                      onClick={
                        employeeBeingEdited
                          ? () => startChipEdit(skill)
                          : undefined
                      }
                      onDelete={
                        employeeBeingEdited
                          ? () => deleteSkill(skill)
                          : undefined
                      }
                    />
                  );
                })}
              </Stack>
            )}
          </Box>
        </Box>

        {employeeBeingEdited && (
          // add skill in-line 'form'
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap", alignItems: "center"}}>
            <TextField
              placeholder="Add skill"
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              size="small"
              sx={chipLikeInputSx}
            />

            <Button
              variant="contained"
              color={"secondary"}
              startIcon={<AddIcon/>}
              onClick={addSkill}
              sx={chipLikeButtonSx}
            >
              Add
            </Button>
          </Stack>
        )}
      </Stack>
    );
  };

  const renderSkillActions = (employee: Employee) => {
    const employeeBeingEdited = editingSkillsEmployeeId === employee.id;

    return (
      <Stack direction="row" spacing={1} sx={{justifyContent: "space-around"}}>
        {employeeBeingEdited ? (
          <>
            <IconButton size="small" onClick={() => { void confirmSkills(employee); }} aria-label="Confirm skills changes" sx={chipLikeIconButtonSx}>
              <CheckIcon/>
            </IconButton>

            <IconButton size="small" onClick={cancelSkillsEdit} aria-label="Cancel skills changes" sx={chipLikeIconButtonSx}>
              <CloseIcon/>
            </IconButton>
          </>
        ) : (
          <IconButton size="small" onClick={() => beginSkillEdit(employee)} aria-label="Edit skills" sx={chipLikeIconButtonSx}>
            <EditIcon/>
          </IconButton>
        )}
      </Stack>
    );
  };

  return (
    <TableContainer component={Paper} sx={{width: "100%", bgcolor: 'primary.main'}}>
      <Table sx={{width: "100%", borderCollapse: "separate", borderSpacing: "0", tableLayout: 'auto' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 56 }} />
            <TableCell align="center" sx={{ width: 140, minWidth: 140 }}>Name</TableCell>
            <TableCell align="center" sx={{ width: 240, minWidth: 240 }}>Role</TableCell>
            <TableCell align="center" sx={{ width: 160, minWidth: 160 }}>Team</TableCell>
            <TableCell sx={{ width: 120, minWidth: 120 }} />
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No employees found
              </TableCell>
            </TableRow>
          ) : (
            employees.map(employee => {
              const expanded = isExpanded(employee);
              const isEmployeeEditing = editingEmployeeId === employee.id;
              const employeeEditValid = isEmployeeEditValid();
              return (
                <Fragment key={employee.id}>
                  {/*employee row*/}
                  <TableRow
                    sx={{
                      "& > td": {
                        bgcolor: "background.paper"
                      },
                      "& > td:first-of-type": {
                        borderTopLeftRadius: 2,
                        borderBottomLeftRadius: 2
                      },
                      "& > td:last-of-type": {
                        borderTopRightRadius: 2,
                        borderBottomRightRadius: 2
                      }
                    }}
                  >
                    {/*collapse button cell*/}
                    <TableCell sx={{width: 56}}>
                      <IconButton
                        size="small"
                        onClick={() => toggleExpanded(employee)}
                        aria-label={expanded ? "Collapse employee skills" : "Expand employee skills"}
                        aria-expanded={expanded}
                      >
                        <ExpandMoreIcon
                          sx={{
                            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 150ms ease"
                          }}
                        />
                      </IconButton>
                    </TableCell>

                    {/*name cell*/}
                    <TableCell align="center" sx={{ width: 140, minWidth: 140, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                      {isEmployeeEditing ? (
                        <TextField
                          value={editingEmployeeName}
                          onChange={(e) => setEditingEmployeeName(e.target.value)}
                          variant="standard"
                          placeholder="Name"
                          autoFocus
                          slotProps={{
                            input: {
                              disableUnderline: false
                            }
                          }}
                          sx={chipLikeInputSx}
                        />
                      ) : (
                        employee.name
                      )}
                    </TableCell>

                    {/*role cell*/}
                    <TableCell align="center" sx={{ width: 240, minWidth: 240, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                      {isEmployeeEditing ? (
                        <TextField
                          select
                          value={editingEmployeeRole}
                          onChange={(e) => setEditingEmployeeRole(e.target.value as string)}
                          variant="standard"
                          sx={chipLikeInputSx}
                          slotProps={slotProps}
                        >
                          <MenuItem value="" sx={menuItemSx}>Select Role</MenuItem>
                          {roles.map(r => (
                            <MenuItem key={r.id ?? r.role} value={r.role} sx={menuItemSx}>
                              {r.role}
                            </MenuItem>
                          ))}
                        </TextField>
                      ) : (
                        employee.role?.role
                      )}
                    </TableCell>

                    {/*team name cell*/}
                    <TableCell align="center" sx={{ width: 160, minWidth: 160, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                      {isEmployeeEditing ? (
                        <TextField
                          select
                          value={editingEmployeeTeam}
                          onChange={(e) => setEditingEmployeeTeam(e.target.value as string)}
                          variant="standard"
                          sx={chipLikeInputSx}
                          slotProps={slotProps}
                        >
                          <MenuItem value="" sx={menuItemSx}>Select Team</MenuItem>
                          {teams.map(t => (
                            <MenuItem key={t.id ?? t.team} value={t.team} sx={menuItemSx}>
                              {t.team}
                            </MenuItem>
                          ))}
                        </TextField>
                      ) : (
                        employee.team?.team ?? ""
                      )}
                    </TableCell>

                    {/*employee action buttons*/}
                    <TableCell align="center" sx={{ width: 120, minWidth: 120 }}>
                      <Stack direction="row" spacing={1} sx={{justifyContent: "space-around"}}>
                        {isEmployeeEditing ? (
                          <>
                            <IconButton size="small" aria-label="Confirm employee changes" onClick={() => {void confirmEmployeeEdit(employee);}} disabled={!employeeEditValid} sx={plainIconButtonSx}>
                              <CheckIcon/>
                            </IconButton>

                            <IconButton size="small" aria-label="Cancel employee changes" onClick={cancelEmployeeEdit} sx={plainIconButtonSx}>
                              <CloseIcon/>
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <IconButton size="small" aria-label="Edit employee" onClick={() => beginEmployeeEdit(employee)} sx={plainIconButtonSx}>
                              <EditIcon/>
                            </IconButton>

                            <IconButton size="small" color="error" aria-label="Delete employee" onClick={() => onDelete(employee.id)} sx={plainIconButtonSx}>
                              <DeleteIcon/>
                            </IconButton>
                          </>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>

                  {/*collapsible skills row*/}
                  <TableRow
                    sx={{
                      "& > td": {
                        px: 2,
                        py: 0,
                        border: 0
                      }
                    }}
                  >
                    <TableCell colSpan={4}>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Box
                          sx={{
                            px: 4,
                            py: 2
                          }}
                        >
                          {renderSkillContent(employee)}
                        </Box>
                      </Collapse>
                    </TableCell>
                    <TableCell align="right" sx={{ width: 120, minWidth: 120 }}>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                        {/*<Box sx={{ px: 2, py: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'right' }}>*/}
                          {renderSkillActions(employee)}
                        {/*</Box>*/}
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
