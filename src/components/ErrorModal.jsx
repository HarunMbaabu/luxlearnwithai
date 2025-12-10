"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"

import PropTypes from 'prop-types';

export function ErrorModal({ isOpen, onClose, error }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Payment Issue
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            {error || "We're having trouble processing your payment."}
          </p>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              Need help? Contact our support team at:
            </p>
            <p className="text-sm font-medium text-gray-800 mt-1">
              info@luxdevhq.com
            </p>
          </div>
          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

ErrorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  error: PropTypes.string
}