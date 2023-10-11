import { Button, ButtonProps, CircularProgress, useTheme } from "@mui/material"

interface LoadingContainedButtonProps extends ButtonProps {
  loading: boolean
  children: React.ReactNode
}

const LoadingContainedButton = ({
  loading,
  children,
  ...props
}: LoadingContainedButtonProps) => {
  const { palette } = useTheme()
  console.log(palette.primary.main)
  return (
    <Button
      variant="contained"
      startIcon={loading ? <CircularProgress size={20} /> : null}
      disabled={loading}
      sx={{ "&.Mui-disabled": { background: `${palette.primary.main}26` } }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default LoadingContainedButton
