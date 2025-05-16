
"use client"

import * as React from "react"

// Minimal types to make the hook work.
// These would ideally come from a central types definition or the components themselves if they were still TS.
interface MinimalToastProps {
  id?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "default" | "destructive";
  // Add other props if they are used by the toast() function or reducer
  // For example:
  // className?: string;
  // style?: React.CSSProperties;
  // duration?: number;
  // viewportName?: string;
  // forceMount?: true;
  // [key: string]: any; // Allow other props
}

interface MinimalToastActionElement extends React.ReactElement<any, any> {}


const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000 // This is a very long delay, likely for debugging purposes

type ToasterToast = MinimalToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: MinimalToastActionElement
}

const ACTION_TYPES = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

// type ActionType = typeof ACTION_TYPES[keyof typeof ACTION_TYPES] // Not directly used, but good for understanding

type Action =
  | { type: typeof ACTION_TYPES.ADD_TOAST; toast: ToasterToast }
  | { type: typeof ACTION_TYPES.UPDATE_TOAST; toast: Partial<ToasterToast> & { id: string } } // Ensure ID is present for update
  | { type: typeof ACTION_TYPES.DISMISS_TOAST; toastId?: ToasterToast["id"] }
  | { type: typeof ACTION_TYPES.REMOVE_TOAST; toastId?: ToasterToast["id"] }

interface State {
  toasts: ToasterToast[]
}

let count = 0

function genId(): string {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toastTimeouts = new Map<string, NodeJS.Timeout>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: ACTION_TYPES.REMOVE_TOAST,
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case ACTION_TYPES.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case ACTION_TYPES.DISMISS_TOAST: {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case ACTION_TYPES.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
    default:
      // Ensure all action types are handled or return current state
      return state;
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type ToastOpts = Omit<ToasterToast, "id" | "open" | "onOpenChange">

function toast(props: ToastOpts) {
  const id = genId()

  const update = (updateProps: Partial<Omit<ToasterToast, "id">>) => // Make props partial and omit id
    dispatch({
      type: ACTION_TYPES.UPDATE_TOAST,
      toast: { ...updateProps, id },
    })
  const dismiss = () => dispatch({ type: ACTION_TYPES.DISMISS_TOAST, toastId: id })

  dispatch({
    type: ACTION_TYPES.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: ACTION_TYPES.DISMISS_TOAST, toastId }),
  }
}

export { useToast, toast }
