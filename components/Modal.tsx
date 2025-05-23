/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ModalProps = {
  children?: ReactNode
  onClose: () => void
  isOpen?: boolean
}

export default function Modal({ children, onClose, isOpen = true }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 bg-storm/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-3xl shadow-medium p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <motion.button 
              onClick={onClose} 
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-mist hover:bg-sage-light transition-colors flex items-center justify-center group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5 text-earth group-hover:text-sage-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
