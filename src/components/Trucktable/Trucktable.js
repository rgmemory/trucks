import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../Drivertable/Drivertable'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function TruckTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell >Unit</TableCell>
            <TableCell>Make</TableCell>
            <TableCell >Model</TableCell>
            <TableCell >Plate</TableCell>
            <TableCell >Vin</TableCell>
            <TableCell numeric>Year</TableCell>
            <TableCell >Actions</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.trucks.map((row, index) => {
            return (
              <TableRow key={row.make + index}>
                <TableCell numeric>{row.unit}</TableCell>
                <TableCell >{row.make}</TableCell>
                <TableCell >{row.model}</TableCell>
                <TableCell >{row.plate}</TableCell>
                <TableCell >{row.vin}</TableCell>
                <TableCell >{row.year}</TableCell>
                <TableCell ><button className="change-button edit">Edit</button><button className="change-button delete">Delete</button></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

TruckTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TruckTable);