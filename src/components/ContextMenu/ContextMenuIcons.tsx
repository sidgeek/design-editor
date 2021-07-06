function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M15 5.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h2.5v-1.5H5a.5.5 0 0 1-.5-.5V5c0-.28.22-.5.5-.5h8c.28 0 .5.22.5.5v.5H15zm-4 3a.5.5 0 0 0-.5.5v10c0 .28.22.5.5.5h8a.5.5 0 0 0 .5-.5V9a.5.5 0 0 0-.5-.5h-8zM11 7h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2z"
      ></path>
    </svg>
  )
}

function PasteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="_1304310517__a" fill="#fff">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 5a2 2 0 1 0-4 0H8v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V5h-2z"
        />
      </mask>
      <path
        d="M14 5h-1.5v1.5H14V5zm-4 0v1.5h1.5V5H10zM8 5V3.5H6.5V5H8zm8 0h1.5V3.5H16V5zm-4-.5a.5.5 0 0 1 .5.5h3A3.5 3.5 0 0 0 12 1.5v3zm-.5.5a.5.5 0 0 1 .5-.5v-3A3.5 3.5 0 0 0 8.5 5h3zM8 6.5h2v-3H8v3zM9.5 8V5h-3v3h3zM9 7.5a.5.5 0 0 1 .5.5h-3A2.5 2.5 0 0 0 9 10.5v-3zm6 0H9v3h6v-3zm-.5.5a.5.5 0 0 1 .5-.5v3A2.5 2.5 0 0 0 17.5 8h-3zm0-3v3h3V5h-3zM14 6.5h2v-3h-2v3z"
        fill="currentColor"
        mask="url(#_1304310517__a)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 6.5h1.714c.316 0 .572.224.572.5v13c0 .276-.256.5-.572.5H6.286c-.316 0-.572-.224-.572-.5V7c0-.276.256-.5.572-.5H8V5H6.286C5.023 5 4 5.895 4 7v13c0 1.105 1.023 2 2.286 2h11.428C18.977 22 20 21.105 20 20V7c0-1.105-1.023-2-2.286-2H16v1.5z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

function DeleteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M8 5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3h4.25a.75.75 0 1 1 0 1.5H19V18a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6.5H3.75a.75.75 0 0 1 0-1.5H8zM6.5 6.5V18c0 .83.67 1.5 1.5 1.5h8c.83 0 1.5-.67 1.5-1.5V6.5h-11zm3-1.5h5c0-.83-.67-1.5-1.5-1.5h-2c-.83 0-1.5.67-1.5 1.5zm-.25 4h1.5v8h-1.5V9zm4 0h1.5v8h-1.5V9z"
      ></path>
    </svg>
  )
}

const icons = {
  copy: <CopyIcon />,
  delete: <DeleteIcon />,
  paste: <PasteIcon />,
}

export default icons
