import { BlueSpinner } from "@/components/BlueSpinner";

export function LoadingText() {                                                            
    return (                                                                      
      <div  className="flex justify-start pl-2 items-center">                                  
        <BlueSpinner  />                                                          
        <span className="animate-pulse text-normal text-blue-900">Carregando...</span>
      </div>                                                                      
    )                                                                             
  } 