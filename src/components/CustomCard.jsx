import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { Card, Modal, Form } from "react-bootstrap";
import { toast } from 'react-toastify';

const CustomCard = ({ droppableId, item, index, updateTicket }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [showModal, setShowModal] = useState(false)

  const onCloseHandler = () => {
    setShowModal(false)
    setTitle('')
    setDescription('')
  }

  const onSaveHandler = () => {
    if(title===''){
      toast.error('Title cannot be empty.')
      return
    }
    updateTicket({
      droppableId:droppableId,
      id: item.id,
      title: title,
      description: description
    })
    onCloseHandler()
  }
  return (
    <React.Fragment>
      <Draggable
        key={item.id}
        draggableId={item.id}
        index={index}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              paddingBottom: 10
            }}

          >
            <Card style={{ border: 0, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', }}
              onClick={() => { setShowModal(true); setTitle(item.title); setDescription(item.description) }}
            >
              <Card.Body>
                <h5 style={{ fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',color:'#161616' }}>{item.title}</h5>
                <p style={{ color: '#868686', textAlign: 'justify', textJustify: 'inter-word', fontSize: 14 }}>
                  {item.description}
                </p>
              </Card.Body>
            </Card>
          </div>
        )}
      </Draggable>
      <Modal show={showModal}>
        <Modal.Header>
          <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
        </Modal.Header>
        <Modal.Body>
          <Form.Control as="textarea" rows={10} placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
        </Modal.Body>
        <Modal.Footer>
          <div style={{ borderRadius: 50, height: 30, display: 'flex', backgroundColor: 'white', border: '1px #2A60E4 solid', alignItems: 'center', paddingLeft: 10, paddingRight: 10, cursor: 'pointer', marginRight: 10 }}
            onClick={() => onCloseHandler()}
          >
            <i className="bx bx-x" style={{ fontSize: 14, color: '#2A60E4', marginRight: 5 }}></i>
            <p style={{ margin: 0, fontWeight: 300, color: '#2A60E4', fontSize: 14 }}>Close</p>
          </div>
          <div style={{ borderRadius: 50, height: 30, display: 'flex', backgroundColor: '#2A60E4', alignItems: 'center', paddingLeft: 10, paddingRight: 10, cursor: 'pointer' }}
            onClick={() => onSaveHandler()}
          >
            <i className="bx bx-save" style={{ fontSize: 14, color: 'white', marginRight: 5 }}></i>
            <p style={{ margin: 0, fontWeight: 300, color: '#ffffff', fontSize: 14 }}>Save</p>
          </div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}
export default CustomCard