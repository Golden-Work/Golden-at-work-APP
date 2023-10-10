import { Major } from "@/interfaces"
import { useEffect, useMemo, useState } from "react"
import axios from "axios"

const useMajors = () => {
  const [majors, setMajors] = useState<Major[]>([])
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const getMajors = async () => {
      setIsFetching(true)
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}majors`
      )
      setMajors(response.data)
      setIsFetching(false)
    }

    getMajors()
  }, [])

  const majorOptions = useMemo(() => {
    return majors.map((major) => ({
      value: major.id,
      label: major.name,
    }))
  }, [majors])

  return {
    majorOptions,
    isFetching,
  }
}

export default useMajors
