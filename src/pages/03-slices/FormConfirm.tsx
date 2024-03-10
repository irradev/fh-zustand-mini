import { useWeddingBoundStore } from "../../stores/wedding"


export const FormConfirm = () => {

    const isConfirmed = useWeddingBoundStore(state => state.isConfirmed);
    const setIsConfirmed = useWeddingBoundStore(state => state.setIsConfirmed);

    return (
        <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
                ¿Tu también vendrás?
            </label>
            <div className="flex items-center space-x-6">
                <div className="flex items-center">
                    <input
                        type="radio"
                        name="isComing"
                        id="radioButton1"
                        className="h-5 w-5 cursor-pointer"
                        checked={isConfirmed}
                        onChange={() => setIsConfirmed(true)}
                    />
                    <label
                        htmlFor="radioButton1"
                        className="pl-3 text-base font-medium text-[#07074D] cursor-pointer"
                    >
                        Si
                    </label>
                </div>
                <div className="flex items-center ">
                    <input
                        type="radio"
                        name="isComing"
                        id="radioButton2"
                        className="h-5 w-5 cursor-pointer"
                        checked={!isConfirmed}
                        onChange={() => setIsConfirmed(false)}
                    />
                    <label
                        htmlFor="radioButton2"
                        className="pl-3 text-base font-medium text-[#07074D] cursor-pointer"
                    >
                        No
                    </label>
                </div>
            </div>
        </div>
    )
}