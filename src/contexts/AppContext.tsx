import React, { createContext, useState, useContext, FC } from 'react'

interface AppContext {
  isMobile: boolean | undefined
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>
}

const Context = createContext<AppContext>({
  isMobile: false,
  setIsMobile: () => {},
})

export const AppProvider: FC = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(undefined)
  const context = { isMobile, setIsMobile }
  return <Context.Provider value={context}>{children}</Context.Provider>
}

export function useAppContext() {
  const { isMobile, setIsMobile } = useContext(Context)
  return { isMobile, setIsMobile }
}
