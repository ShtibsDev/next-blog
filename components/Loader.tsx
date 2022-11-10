interface LoaderProps {
  isVisible: boolean
}

export default function Loader({ isVisible }: LoaderProps) {
  return isVisible ? <div className='loader'></div> : null
}
