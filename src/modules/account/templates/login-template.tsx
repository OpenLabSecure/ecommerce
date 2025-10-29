"use client"

import { useState } from "react"
import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN)

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 small:px-8 bg-ui-bg-subtle">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 small:p-8">
        {/* Header with view toggle */}
        <div className="flex justify-center mb-8 border-b border-ui-border-base">
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className={`flex-1 pb-4 text-center text-base small:text-lg font-medium transition-colors relative ${
              currentView === LOGIN_VIEW.SIGN_IN
                ? "text-ui-fg-base"
                : "text-ui-fg-muted hover:text-ui-fg-subtle"
            }`}
          >
            Iniciar Sesión
            {currentView === LOGIN_VIEW.SIGN_IN && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ui-fg-interactive" />
            )}
          </button>
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className={`flex-1 pb-4 text-center text-base small:text-lg font-medium transition-colors relative ${
              currentView === LOGIN_VIEW.REGISTER
                ? "text-ui-fg-base"
                : "text-ui-fg-muted hover:text-ui-fg-subtle"
            }`}
          >
            Registrarse
            {currentView === LOGIN_VIEW.REGISTER && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ui-fg-interactive" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="w-full">
          {currentView === LOGIN_VIEW.SIGN_IN ? (
            <Login setCurrentView={setCurrentView} />
          ) : (
            <Register setCurrentView={setCurrentView} />
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate