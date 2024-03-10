import { useSyncExternalStore } from "react";
import { useWeddingBoundStore } from "../../stores/wedding"



export const FormEventDate = () => {

    
    const date = useWeddingBoundStore(state => state.getDate());
    const time = useWeddingBoundStore(state => state.getTime());
        
    const setEventDate = useWeddingBoundStore(state => state.setEventDate);
    const setEventTime = useWeddingBoundStore(state => state.setEventTime);

    

    return (
        <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                    <label
                        className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                        Fecha de evento
                    </label>
                    <input
                        type="date"
                        name="eventDate"
                        id="eventDate"
                        value={date}
                        onChange={(e) => setEventDate(e.target.value)}
                    />
                </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                    <label
                        className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                        Hora del evento
                    </label>
                    <input
                        type="time"
                        name="eventTime"
                        id="eventTime"
                        value={time}
                        onChange={(e) => setEventTime(e.target.value)}
                    />
                </div>
            </div>
        </div>

    )
}