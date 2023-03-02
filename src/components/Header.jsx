import { useEffect, useRef } from "react";
import firebase from "../firebase";
import { TweenMax } from "gsap";

const handleLogout = () => {
    firebase.auth().signOut()
}


const Header = ({ isLoading }) => {
    const loaderRef = useRef(null)

    useEffect(() => {
        if (isLoading) {
            TweenMax.to(loaderRef.current, 0.3, {
                css: {
                    opacity: 1,
                }
            })
        } else {
            setTimeout(() => {
                TweenMax.to(loaderRef.current, 0.3, {
                    css: {
                        opacity: 0,
                    }
                })
            }, 500);

        }
    }, [isLoading])

    const style = {
        logo: {
            color: '#2A60E4',
            fontWeight: 500,
            marginBottom: 0,
            marginLeft: 10,
            fontSize: 24
        }
    }
    return (
        <div style={{ height: '10vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <box-icon size="24px" color="#2A60E4" name='columns' style={{ marginLeft: 20 }}></box-icon>
                <h3 style={style.logo}>Kanban Board</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div ref={loaderRef}>
                    <box-icon style={{ marginRight: 20 }} size="md" color="#2A60E4" name='cloud-upload' type="solid" animation='flashing' />
                </div>
                <div style={{ borderRadius: 50, height: 30, display: 'flex', backgroundColor: 'white', border: '1px #2A60E4 solid', alignItems: 'center', paddingLeft: 10, paddingRight: 10, cursor: 'pointer', marginRight: 10 }}
                    onClick={handleLogout}
                >
                    <p style={{ margin: 0, fontWeight: 300, color: '#2A60E4', fontSize: 14 }}>Logout</p>
                </div>

            </div>
        </div>
    )
}

export default Header