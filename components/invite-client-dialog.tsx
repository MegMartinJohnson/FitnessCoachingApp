"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Copy } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InviteClientDialog() {
  const [copied, setCopied] = useState(false)
  const inviteLink = `${window.location.origin}/signup?ref=coach123` // You would generate this dynamically

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Invite Client</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite a new client</DialogTitle>
          <DialogDescription>
            Share this link or QR code with your client to get them started.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Invitation Link</Label>
            <div className="flex gap-2">
              <Input
                value={inviteLink}
                readOnly
                className="flex-1"
              />
              <Button
                variant="secondary"
                className="shrink-0"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Label>QR Code</Label>
            <div className="p-4 bg-white rounded-lg">
              <QRCodeSVG value={inviteLink} size={200} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

