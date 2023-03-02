const style = {
    container: {
        backgroundColor: '#FAFAFA',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
        overflow:'hidden'
    },
    body: {
        width: '100%',
        height: '60%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    btnText: {
        margin: 0,
        fontSize:14,
        marginLeft:10
    },
    loginBtn: {
        backgroundColor: '#2A60E4',
        borderRadius: 5,
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        display: 'flex',
        cursor: 'pointer',
        marginBottom:10,
        zIndex:1
    },
    linkBtnContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    linkBtn:{
        color:'#2A60E4',
        margin:0,
        cursor:'pointer',
    },
    loginForm: {
        width: 400,
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        padding: 40,
        backgroundColor:'white'
    },
    inputField: { marginBottom: 10 },
    loginCardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        height: '100%',
        display:'flex',
        justifyContent:'center'
    },
    infographicContianer: {
        width: '60%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity:0,
        transform:'translateX(-500px)'
    },
    logoContainer:{
        margin:10,
        marginBottom:40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        color:'#2A60E4',
        fontWeight:500,
        fontSize:24,
        margin:0
    }
}
export default style