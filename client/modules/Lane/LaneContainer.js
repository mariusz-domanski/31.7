import { connect } from 'react-redux';
import Lane from './Lane';
import { deleteLaneRequest, createLaneRequest, fetchLanes,updateLaneRequest, editLane } from './LaneActions';
import { createNote, createNoteRequest, moveBetweenLanes } from '../Note/NoteActions';
import * as laneActions from './LaneActions';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';


const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId]).filter(noteId => noteId !== undefined),
});

const noteTarget = {
 hover(targetProps, monitor) {
   const sourceProps = monitor.getItem();
   const { id: noteId, laneId: sourceLaneId } = sourceProps;

   if (!targetProps.lane.notes.length) {
     targetProps.moveBetweenLanes(
       targetProps.lane.id,
       noteId,
       sourceLaneId,
     );
   }
 },
};

const mapDispatchToProps = {
  editLane,
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  addNote: createNoteRequest,
  createLane: createLaneRequest,
  moveBetweenLanes
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);
