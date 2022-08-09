import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const chatLoading = () => {
  return (
    <Stack>
        <Skeleton height="45px" borderRadius="10px"/>
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
    </Stack>
  )
}

export default chatLoading;