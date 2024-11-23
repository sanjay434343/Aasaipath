import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Facebook, Instagram, Twitter, Link2, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip?: {
    destination: string;
    days: number;
    budget: number;
  };
}

function ShareModal({ isOpen, onClose, trip }: ShareModalProps) {
  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const getShareMessage = () => {
    if (!trip) return window.location.href;
    return `Check out my planned trip to ${trip.destination} for ${trip.days} days! Budget: $${trip.budget}`;
  };

  const shareButtons = [
    {
      name: 'Facebook',
      Icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      onClick: () => window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`),
    },
    {
      name: 'WhatsApp',
      Icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700',
      onClick: () => window.open(`https://wa.me/?text=${encodeURIComponent(getShareMessage())}`),
    },
    {
      name: 'Instagram',
      Icon: Instagram,
      color: 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:opacity-90',
      onClick: () => window.open('https://instagram.com'),
    },
    {
      name: 'Twitter',
      Icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      onClick: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareMessage())}`),
    },
    {
      name: 'Copy Link',
      Icon: Link2,
      color: 'bg-gray-600 hover:bg-gray-700',
      onClick: handleCopyLink,
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-2xl"
        >
          <div className="absolute -top-2 -right-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="bg-white text-gray-500 hover:text-gray-700 p-2 rounded-full shadow-lg"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Share Your Adventure</h3>
            {trip && (
              <p className="text-gray-600">
                Share your trip to {trip.destination} with friends and family
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {shareButtons.map((button) => (
              <motion.button
                key={button.name}
                whileHover={{ scale: 1.03, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={button.onClick}
                className={`${button.color} text-white py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-shadow hover:shadow-xl`}
              >
                <button.Icon className="w-5 h-5" />
                <span className="font-medium">{button.name}</span>
              </motion.button>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Share this trip with your network and inspire others to explore!
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ShareModal;