import React, { useState, useEffect, useRef } from 'react';
//import Socket from './Socket';
import socket from './Socket';
import '../App.css';

const Chat = ({ nombre }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    //useEffect(() => {
    //    socket.emit('CHAT', 'nombre');
    //}, [nombre]);

    //useEffect(() => {
    //    socket.on('CHAT', mensaje => {
    //        setMessages([...messages, mensaje]);
    //    })
    //    return () => {socket.off()}
    //}, [messages])

    useEffect(() => {
        socket.on('CHAT', function(data){
            console.log('hola')
            messages.push(data);
            console.log(messages)
        })
        return () => {socket.off()}
    }, [messages])



    const submit = (e) => {
        e.preventDefault();
        const msj = {};
        msj['name'] = nombre;
        msj['message'] = message;
        console.log(msj)
        socket.emit('CHAT', msj)
    }

    return(
        <div>
            <div className="chat">
                {Object.values(messages).map((info) => (
                    <p>{info.date}-<b>{info.name}</b>:{info.message}</p>
                ))}
            </div>
            <form onSubmit={submit}>
                <label htmlFor="">Escriba su mensaje</label>
                <textarea name="" id="" cols="20" rows="5" value={message} onChange={e => setMessage(e.target.value)}>

                </textarea>
                <button>Enviar</button>
            </form>
        </div>
    )
}

export default Chat;

//{messages.map((e, i) => <div key={i}><div>{e.name}</div><div>{e.message}</div></div>)}