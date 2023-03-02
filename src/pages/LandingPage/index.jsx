/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import { Container } from "react-bootstrap";
import Column from "../../components/Column"
import Header from "../../components/Header";
import firebase from "../../firebase"
import uuid from "react-uuid"
import { toast } from 'react-toastify';
import { TimelineLite } from "gsap";

const LandingPage = () => {

    const column1 = useRef(null)
    const column2 = useRef(null)
    const column3 = useRef(null)
    const column4 = useRef(null)

    const userID = firebase.auth().currentUser.uid
    const ref = firebase.firestore().collection(userID)
    const [showInputCard, setShowInputCard] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState({
        todo: [],
        inProgress: [],
        inReview: [],
        done: []
    })

    const getData = () => {

        ref.get().then((item) => {

            const data = item.docs.map(doc => doc.data())
            if (data[0]) {
                setState(data[0])
            }

        })
    }
    useEffect(() => {
        getData()
        const animation = new TimelineLite()
        const delay=0.5
        animation.to(column1.current,delay,{
            css:{
                opacity:1
            }
        })
        animation.to(column2.current,delay,{
            css:{
                opacity:1
            }
        })
        animation.to(column3.current,delay,{
            css:{
                opacity:1
            }
        })
        animation.to(column4.current,delay,{
            css:{
                opacity:1
            }
        })
    }, [])

    const id2List = {
        todo: 'todo',
        inProgress: 'inProgress',
        inReview: 'inReview',
        done: 'done'
    };

    const firestoreSync = (updatedState) => {

        //restrict updation for the user account
        const user = firebase.auth().currentUser
        if(user.email==='demo@linkedin.com'){
            return
        }
        
        setIsLoading(true)
        firebase.firestore()
            .collection(userID)
            .doc('Tickets')
            .set(updatedState)
            .then((response) => {

            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const createNewTicket = ({ droppableId, title, description }) => {

        if (title === '') {
            toast.error('Please provide a title')
            return
        }

        const ticketId = uuid()
        let updatedState = { ...state }
        updatedState[droppableId].unshift({
            id: ticketId,
            title: title,
            description: description
        })
        setState(updatedState)
        firestoreSync(updatedState)
        setShowInputCard(false)
        return true
    }

    const updateTicket = ({ droppableId, id, title, description }) => {
        let updatedState = { ...state }
        state[droppableId].map((item, index) => {
            if (item.id === id) {
                updatedState[droppableId][index].title = title
                updatedState[droppableId][index].description = description
            }
        })
        setState(updatedState)
        firestoreSync(updatedState)
    }
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);
        destClone.splice(droppableDestination.index, 0, removed);
        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;
        return result;
    };
    const getList = id => state[id2List[id]];
    const onDragEnd = result => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            let updatedState = { items };

            if (source.droppableId === 'todo') {
                updatedState = { todo: items };
            }

            if (source.droppableId === 'inProgress') {
                updatedState = { inProgress: items };
            }

            if (source.droppableId === 'inReview') {
                updatedState = { inReview: items };
            }

            if (source.droppableId === 'done') {
                updatedState = { done: items };
            }

            setState({
                ...state,
                ...updatedState
            });
            firestoreSync({
                ...state,
                ...updatedState
            })
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );
            setState({
                ...state,
                ...result
            })
            firestoreSync({
                ...state,
                ...result
            })
        }
    };
    return (
        <Container fluid style={{ padding: 0 }}>
            <Header isLoading={isLoading} />
            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{ height: '90vh' }}>
                    <div style={{ backgroundColor: '#F4F5FA', display: 'flex', width: '100%', overflow: 'auto', height: '90vh' }}>
                        <div ref={column1} style={{opacity:0}}>
                            <Column
                                cardList={state.todo}
                                droppableId={"todo"}
                                title={"To Do"}
                                createNewTicket={createNewTicket}
                                showInputCard={showInputCard}
                                setShowInputCard={setShowInputCard}
                                updateTicket={updateTicket}
                            />
                        </div>
                        <div ref={column2} style={{opacity:0}}>
                            <Column
                                cardList={state.inProgress}
                                droppableId={"inProgress"}
                                title={"In Progress"}
                                createNewTicket={createNewTicket}
                                showInputCard={showInputCard}
                                setShowInputCard={setShowInputCard}
                                updateTicket={updateTicket}
                            />
                        </div>
                        <div ref={column3} style={{opacity:0}}>
                            <Column
                                cardList={state.inReview}
                                droppableId={"inReview"}
                                title={"In Review"}
                                createNewTicket={createNewTicket}
                                showInputCard={showInputCard}
                                setShowInputCard={setShowInputCard}
                                updateTicket={updateTicket}
                            />
                        </div>
                        <div ref={column4} style={{opacity:0}}>
                            <Column
                                cardList={state.done}
                                droppableId={"done"}
                                title={"Done"}
                                createNewTicket={createNewTicket}
                                showInputCard={showInputCard}
                                setShowInputCard={setShowInputCard}
                                updateTicket={updateTicket}
                            />
                        </div>
                    </div>
                </div>
            </DragDropContext>
        </Container>

    );
}

export default LandingPage
