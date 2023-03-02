import React, { useState, useLayoutEffect, useEffect, useRef } from 'react'
import { Form, Button } from "react-bootstrap";
import { TweenMax, Power3, TimelineLite } from "gsap";
import style from "./style"
import firebase from "../../firebase";
import loginPageImage from "../../assets/loginPageImage.png"
import { toast } from 'react-toastify';

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isMobileView, setIsMobileView] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showSignup, setShowSignup] = useState(false)
    const loginCardRef = useRef(null)
    const signupRef = useRef(null)
    const imageRef = useRef(null)

    useEffect(() => {
        TweenMax.set(loginCardRef.current, {
            css: {
                opacity: 0,
                translateX: "500"
            }
        })
        TweenMax.set(signupRef.current, {
            css: {
                height: 0,
                opacity: 0,
                display: 'none'
            }
        })
        setTimeout(() => {
            TweenMax.to(loginCardRef.current, 1, {
                css: {
                    opacity: 1,
                    translateX: "0",

                },
                ease: Power3.easeInOut
            })
            TweenMax.to(imageRef.current, 1, {
                css: {
                    opacity: 1,
                    translateX: "0",

                },
                ease: Power3.easeInOut
            })
        }, 500);

    }, [])

    useLayoutEffect(() => {
        const updateWidth = () => {
            if (window.innerWidth >= 900) {
                setIsMobileView(true)
            } else {
                setIsMobileView(false)
            }
        }
        window.addEventListener('resize', updateWidth)
        updateWidth()
        return () => {
            window.removeEventListener('resize', updateWidth)
        };
    }, [])

    const animateError = () => {
        let animation = new TimelineLite()
        animation.to(loginCardRef.current, .1, { css: { translateX: "5" }, ease: Power3.easeInOut })
        animation.to(loginCardRef.current, .1, { css: { translateX: "-5" }, ease: Power3.easeInOut })
        animation.to(loginCardRef.current, .1, { css: { translateX: "5" }, ease: Power3.easeInOut })
        animation.to(loginCardRef.current, .1, { css: { translateX: "-5" }, ease: Power3.easeInOut })
    }

    const onClickListener = () => {
        if (email === '' && password === '') {
            animateError()
            return
        }
        setIsLoading(true)
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                props.history.push('/LandingPage')
            })
            .catch(error => {
                console.log(error.code)
                animateError()
                switch (error.code) {
                    case 'auth/invalid-email':
                        toast.error('Looks like the email id you entered is incorrect, please crosscheck.')
                        break;
                    case 'auth/user-not-found':
                        toast.error(`Sorry, we didn't find your account, please Sign up.`)
                        break;
                    case 'auth/user-disabled':
                        toast.error(`Your account has been disabled, please contact the administrator.`)
                        break;
                    case 'auth/wrong-password':
                        toast.error(`Wrong Password.`)
                        break;
                    default:
                        toast.error('Looks like the email id you entered is incorrect, please crosscheck.')
                        break;
                }
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const onSignupHandler = () => {
        if (email === '' && password === '') {
            animateError()
            return
        }

        if (password !== confirmPassword) {
            toast.error('Passwords did not match.')
            animateError()
            return
        }

        setIsLoading(true)
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                props.history.push('/LandingPage')
            })
            .catch(error => {
                console.log(error.code)
                animateError()
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        toast.error('Your account already exists, Please login.')
                        break;
                    case 'auth/invalid-email':
                        toast.error(`Email address is invalid.`)
                        break;
                    case 'auth/weak-password':
                        toast.error(`Please enter a strong password.`)
                        break;
                    default:
                        toast.error('Looks like the email id you entered is incorrect, please crosscheck.')
                        break;
                }
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const switchToSignup = () => {
        TweenMax.to(signupRef.current, .3, {
            css: {
                height: 50,
                opacity: 1,
                display: 'block'
            },
            onComplete: () => setShowSignup(true)
        })
    }
    const switchToLogin = () => {
        TweenMax.to(signupRef.current, .3, {
            css: {
                height: 0,
                opacity: 0,
                display: 'none'
            },
            onComplete: () => setShowSignup(false)
        })
    }
    const loginAsGuest = () => {
        setIsLoading(true)
        firebase
            .auth()
            .signInWithEmailAndPassword('demo@linkedin.com', 'Admin@123')
            .then(() => {
                props.history.push('/LandingPage')
                setIsLoading(false)
            })
    }
    return (
        <div style={style.container}>

            <div style={style.body}>
                {isMobileView ?
                    <div style={style.infographicContianer} ref={imageRef}>
                        <div style={style.imageContainer} >
                            <img src={loginPageImage} alt={"loginImage"} height="100%" />
                        </div>
                    </div>
                    : null}
                <div style={{ ...style.loginCardContainer, width: isMobileView ? '40%' : '100%' }}>
                    <div style={style.loginForm} ref={loginCardRef}>
                        <div style={style.logoContainer}>

                            <i className="bx bx-columns" style={{ fontSize: 24, color: '#2A60E4', marginRight: 10 }}></i>
                            <div style={style.logo}>
                                <h2 style={style.logo}>Kanban Board</h2>
                            </div>
                        </div>
                        <div>
                            <Form.Control
                                variant="light"
                                type='text'
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={style.inputField}
                            />
                            <Form.Control
                                variant="light"
                                type='password'
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={style.inputField}
                            />
                            <div ref={signupRef}>
                                <Form.Control
                                    variant="light"
                                    type='password'
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    style={style.inputField}
                                />
                            </div>
                            <Button variant="light" style={style.loginBtn} onClick={showSignup ? onSignupHandler : onClickListener} disabled={isLoading}>
                                {isLoading ?
                                    <box-icon name='loader-circle' animation='spin' flip='vertical' color='white' ></box-icon> :
                                    showSignup ? <h6 style={style.btnText}>Sign up</h6> : <h6 style={style.btnText}>Login</h6>
                                }
                            </Button>
                            <Button variant="light" style={style.loginBtn} onClick={loginAsGuest} disabled={isLoading}>
                                {isLoading ?
                                    <box-icon name='loader-circle' animation='spin' flip='vertical' color='white' ></box-icon> :
                                    <h6 style={style.btnText}>Login as Guest</h6>
                                }
                            </Button>
                            {showSignup ?
                                <div style={style.linkBtnContainer}>
                                    <p style={style.btnText}>Already have an account?</p>
                                    <div style={style.linkBtn} onClick={switchToLogin}>
                                        <h6 style={style.btnText}>Login </h6>
                                    </div>
                                </div>
                                :
                                <div style={style.linkBtnContainer}>
                                    <p style={style.btnText}>Don't have an account?</p>
                                    <div style={style.linkBtn} onClick={switchToSignup}>
                                        <h6 style={style.btnText}>Sign up</h6>
                                    </div>
                                </div>}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login