import React, {useRef, useEffect} from "react"
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

type Props = {
    options: any,
    src: string,
    onReady?: () => void
}

export const VideoPlayer = ({options, src, onReady}: Props) => {
    const videoRef = useRef(null);
    const playerRef = useRef<videojs.Player | null>(null)

    useEffect(() => {
        const player = playerRef.current
        if(!player){
            const videoElement = videoRef.current

            if(!videoElement) return

            const player = playerRef.current = videojs(videoElement, {...options, src}, () => {
                player.play()
            })
        } else {
            const player = playerRef.current;
            if(player){
                player.play()
                player.src(src)
            }
        }

        console.log(src)


        return () => {
            // const player = playerRef.current;
            // if(player){
            //     // player.dispose()
            // }
        }

    }, [options, src, onReady])

    return (
        <video ref={videoRef} className="video-js"></video>
    )
}