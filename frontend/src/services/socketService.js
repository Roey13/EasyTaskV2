import io from 'socket.io-client'
import { httpService } from './httpService'

export const SOCKET_EVENT_BOARD_UPDATED = 'board-updated';


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

window.socketService = socketService

var socketIsReady = false;


function createSocketService() {
    var socket = null;
    const socketService = {
        async setup() {
            if (socket) return
            await httpService.get('setup-session')
            socket = io(baseUrl, { reconnection: false })
            socketIsReady = true;
        },
        async on(eventName, cb) {
            if (!socket) await socketService.setup()
            socket.on(eventName, cb)
        },
        async off(eventName, cb = null) {
            if (!socket) await socketService.setup()
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        async emit(eventName, data) {
            if (!socket) await socketService.setup()
            await socket.emit(eventName, data)
        },
        terminate() {
            socket = null
            socketIsReady = false
        }
    }
    return socketService
}

function createDummySocketService() {
    var listenersMap = {}
    const socketService = {
        listenersMap,
        setup() {
            listenersMap = {}
        },
        terminate() {
            this.setup()
        },
        on(eventName, cb) {
            listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
        },
        off(eventName, cb) {
            if (!listenersMap[eventName]) return
            if (!cb) delete listenersMap[eventName]
            else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
        },
        emit(eventName, data) {
            if (!listenersMap[eventName]) return
            listenersMap[eventName].forEach(listener => {
                listener(data)
            })
        },
        debugMsg() {
            this.emit('chat addMsg', { from: 'Someone', txt: 'Aha it worked!' })
        },
    }
    return socketService
}

