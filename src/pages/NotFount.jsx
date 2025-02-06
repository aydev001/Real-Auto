import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import { motion } from 'motion/react'
import notFountAnimate from "../assets/not-fount.json"

const NotFount = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: [0, 1], y: [30, -10, 0] }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
      className='flex justify-center items-center flex-col min-h-[calc(100vh-100px)]'>
      <div className='max-w-[500px]'>
        <Player
          src={notFountAnimate}
          loop
          autoplay
        />
      </div>
    </motion.div>
  )
}

export default NotFount
