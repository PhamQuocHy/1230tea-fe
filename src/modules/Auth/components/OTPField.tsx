import { Button } from "antd";
import { createRef, FC, RefObject, useState } from "react";

interface Props {
  handleVerifyOtp: (otp: string) => void;
}

const OTPField: FC<Props> = (props: Props) => {
  const numberOfInputs = 6;

  const [otp, setOtp] = useState<string[]>(new Array(numberOfInputs).fill(""));
  const [currentElement, setCurrentElement] = useState(0);

  const [refsList] = useState<RefObject<HTMLInputElement>[]>(() => {
    return Array.from({ length: numberOfInputs }, () =>
      createRef<HTMLInputElement>()
    );
  });

  return (
    <div className="flex flex-col gap-4 mt-5">
      <div className="flex justify-center items-center space-x-2">
        {otp.map((_, index) => {
          return (
            <div key={index}>
              <input
                ref={refsList[index]}
                type="text"
                maxLength={1}
                onFocus={(e) => {
                  e.target.select();
                }}
                onChange={(e) => {
                  if (e.target.value.match(/[0-9]/)) {
                    setCurrentElement((prev) => {
                      const nextIndex = (index + 1) % numberOfInputs;
                      const nextElement = refsList[nextIndex].current;
                      nextElement!.focus();
                      nextElement!.select();
                      return nextIndex;
                    });

                    setOtp((prev) => {
                      prev[index] = e.target.value;

                      return prev;
                    });
                  } else {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  }
                }}
                className="lg:w-12 lg:h-12 w-9 h-9 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-PrimaryContainerLight focus:text-gray-700 text-gray-400 transition"
              />
              {index === otp.length - 1 ? null : (
                <span className="w-2 py-0.5 bg-gray-400" />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row justify-center mt-5">
        <Button
          type="primary"
          size="large"
          htmlType="button"
          className="bg-color1230  text-OnTertiaryLight w-4/6"
          onClick={() => {
            console.log(otp.join(""));
            props.handleVerifyOtp(otp.join(""));
          }}
          block
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
};

export default OTPField;
