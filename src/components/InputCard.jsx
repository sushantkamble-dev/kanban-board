import React, { useState } from 'react'
import { Card, Form } from "react-bootstrap";

const CustomCard = ({ setShowInputCard, createNewTicket, droppableId }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const onCreateHandler = () => {
    const response = createNewTicket({ droppableId, title, description })
    if(response){
      setTitle('')
      setDescription('')
    }
  }

  return (
    <div style={{ paddingBottom: 10 }}>
      <Card>
        <Card.Body>
          <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ marginBottom: 10 }} />
          <Form.Control as="textarea" rows={3} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ marginBottom: 10 }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ borderRadius: 50, height: 30, display: 'flex', backgroundColor: 'white', border: '1px #2A60E4 solid', alignItems: 'center', paddingLeft: 10, paddingRight: 10, cursor: 'pointer', marginRight: 10 }}
              onClick={() => setShowInputCard(false)}
            >
              <i className="bx bx-x" style={{ fontSize: 14, color: '#2A60E4', marginRight: 5 }}></i>
              <p style={{ margin: 0, fontWeight: 300, color: '#2A60E4', fontSize: 14 }}>Close</p>
            </div>
            <div style={{ borderRadius: 50, height: 30, display: 'flex', backgroundColor: '#2A60E4', alignItems: 'center', paddingLeft: 10, paddingRight: 10, cursor: 'pointer' }}
              onClick={onCreateHandler}
            >
              <i className="bx bx-save" style={{ fontSize: 14, color: 'white', marginRight: 5 }}></i>
              <p style={{ margin: 0, fontWeight: 300, color: '#ffffff', fontSize: 14 }}>Save</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}
export default CustomCard