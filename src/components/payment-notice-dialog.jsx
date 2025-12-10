"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CreditCard } from "lucide-react"


export function PaymentNoticeDialog({ isOpen, onClose, onProceed, countryName }) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <span>Payment Method Notice</span>
          </DialogTitle>
          <DialogDescription>{`We've detected that you're accessing our platform from `} {countryName}.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-700">
            For international payments from outside Kenya, only card payments are supported. You will be redirected to
            our secure payment page where you can complete your transaction using a debit or credit card.
          </p>
          <p className="mt-2 text-sm font-medium text-gray-700">
            This ensures a smooth and secure payment experience for our international students.
          </p>
          <p className="mt-4 text-sm font-medium text-amber-600">
            Please note: All payments are processed in Kenyan Shillings (KES). Your card issuer will handle the currency
            conversion based on their exchange rates.
          </p>
        </div>
        <DialogFooter className="flex flex-row justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onProceed}>Proceed to Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
