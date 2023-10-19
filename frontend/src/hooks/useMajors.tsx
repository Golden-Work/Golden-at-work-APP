import { Major } from "@/interfaces"
import { useEffect, useMemo, useState } from "react"
import api from "@/api"

const useMajors = () => {
  const [majors, setMajors] = useState<Major[]>([])
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const getMajors = async () => {
      setIsFetching(true)
      const response = await api.get(`majors`)
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
