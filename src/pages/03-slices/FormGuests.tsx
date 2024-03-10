import { useRef } from "react";
import { useWeddingBoundStore } from "../../stores/wedding";


export const FormGuests = () => {

    const guestCount = useWeddingBoundStore(state => state.guesCount);
    const setGuestCount = useWeddingBoundStore(state => state.setGuestCount);

    const inputRef = useRef<HTMLInputElement | null>(null);

    if (inputRef.current) {
        let countSplitted = inputRef.current.value.toString().split('');
        if (countSplitted.length > 1 && countSplitted[0] === '0') {
            countSplitted = countSplitted.slice(1);
            inputRef.current.value = countSplitted.join('');
        }
    }

    return (
        <div className="mb-5">
            <label
            className="mb-3 block text-base font-medium text-[#07074D]"
            >
            ¿Cuántos invitados traerá?
            </label>
            <input
                ref={inputRef}
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                type="number"
                name="guestNumber"
                id="guestNumber"
                placeholder="5"
                min="0"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
        </div>
    )
}