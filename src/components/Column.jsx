import { useRef, useEffect } from "react";
import { Droppable } from 'react-beautiful-dnd';
import { TweenMax, Power3 } from "gsap"
import CustomCard from "./CustomCard";
import InputCard from "./InputCard";
const Column = ({ droppableId, title, cardList, createNewTicket, showInputCard, setShowInputCard, updateTicket }) => {
    let addCardRef = useRef(null)
    useEffect(() => {
        TweenMax.to(
            addCardRef.current,
            0.4,
            {
                opacity: 0,
                height: 0,
                ease: Power3.easeInOut
            },

        )
    }, [])

    if (showInputCard === droppableId) {
        TweenMax.to(
            addCardRef.current,
            0.4,
            {
                opacity: 1,
                height: 225
            }
        )
    } else {
        TweenMax.to(
            addCardRef.current,
            0.4,
            {
                opacity: 0,
                height: 0
            }
        )
    }

    const style = {
        title: {
            fontWeight: 600,
            marginTop: 'auto',
            marginBottom: 'auto',
            color:'#161616'
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', paddingLeft: 18, paddingRight: 18, justifyContent: 'space-between', marginTop: 20, marginBottom: 20 }}>
                <h5 style={style.title}>{title}</h5>
                <div style={{ borderRadius: 50, height: 30, display: 'flex', backgroundColor: '#2A60E4', alignItems: 'center', paddingLeft: 10, paddingRight: 10, cursor: 'pointer' }}
                    onClick={() => setShowInputCard(droppableId)}
                >
                    <i className="bx bx-plus" style={{ fontSize: 14, color: 'white', marginRight: 5 }}></i>
                    <p style={{ margin: 0, fontWeight: 300, color: '#ffffff', fontSize: 14 }}>New Task</p>
                </div>
            </div>
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={{
                            background: snapshot.isDraggingOver ? '#E7E9F6' : '#E8ECF8',
                            padding: 8,
                            width: 280,
                            margin: 10,
                            borderRadius: 10,
                            minHeight: 20
                        }}>
                        <div ref={addCardRef}>
                            <InputCard
                                setShowInputCard={setShowInputCard}
                                droppableId={droppableId}
                                createNewTicket={createNewTicket}
                            />
                        </div>
                        {cardList.map((item, index) => (
                            <CustomCard
                                item={item}
                                index={index}
                                key={index}
                                updateTicket={updateTicket}
                                droppableId={droppableId}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Column