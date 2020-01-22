import React, {useState} from 'react'
import {Profile as RingProfile} from "@jetbrains/ring-ui/components/header/header";

const GuestUser = {guest: true}

export default function Profile() {
  const [user] = useState(GuestUser)
  const [token] = useState()

  return <RingProfile user={user} />
}
