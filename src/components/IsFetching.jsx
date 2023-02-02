import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const IsFetching = ({countNumber=5}) => {
  return (
    <>
      <Skeleton />
      <Skeleton count={countNumber} />
    </>
  )
}

export default IsFetching
