import React, { useMemo, useRef } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useTheme } from "styled-components/native";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";

import CustomText from "./CustomText";
import CustomButton from "./CustomButton";
import CustomCard from "./CustomCard";
import CustomIconButton from "./CustomIconButton";

interface ModalProps {
  onClose: () => void;
  open: boolean;
  timeout?: number;
}

const AndroidNFCModal: React.FC<ModalProps> = (props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const animation = useRef(null);
  const timeoutId = useRef<any>(null);
  const theme = useTheme();

  const snapPoints = useMemo(() => ["50%"], []);

  React.useEffect(() => {
    const currentRef = bottomSheetRef?.current;
    if (props?.open) {
      currentRef?.present();
    } else {
      currentRef!.close();
    }
    return () => {
      currentRef!.close();
    };
  }, [props?.open]);

  React.useEffect(() => {
    if (props.open && props.timeout) {
      timeoutId.current = setTimeout(() => {
        if (bottomSheetRef.current) {
          bottomSheetRef.current.close();
        }
      }, props.timeout);
    }

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [props.timeout, props.open, timeoutId.current]);

  const renderBackdrop = React.useCallback(
    ({ style, ...restProps }: BottomSheetBackdropProps) => {
      return (
        <BottomSheetBackdrop
          {...restProps}
          disappearsOnIndex={-1}
          pressBehavior={"close"}
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: theme.colors.primary,
            },
            style,
          ]}
        />
      );
    },
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleStyle={{
        display: "none",
      }}
      // add bottom inset to elevate the sheet
      bottomInset={46}
      backdropComponent={renderBackdrop}
      detached={true}
      index={0}
      onDismiss={props.onClose}
      enablePanDownToClose
      enableOverDrag
      enableHandlePanningGesture
      enableDismissOnClose
      style={{
        marginHorizontal: 10,
      }}
      backgroundStyle={{
        backgroundColor: "transparent",
      }}
    >
      <CustomCard
        sx={{
          alignItems: "center",
        }}
        spacing-y="lg"
        spacing-x="lg"
        disableShadow
        rounded="xl"
      >
        <CustomIconButton
          iconName="close"
          size="sm"
          rounded="full"
          sx={{ right: 0, position: "absolute", top: 0 }}
          onPress={props?.onClose}
        />
        <CustomText sx={{ textAlign: "center", bottom: -30 }} variant="h4">
          Ready to Scan
        </CustomText>

        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: "100%",
            height: 250,
          }}
          loop
          source={require("assets/lottie/nfc-animation.json")}
        />
        <CustomText sx={{ textAlign: "center", top: -26 }}>
          Please tap NFC tags
        </CustomText>
        <CustomButton size="md" onPress={props?.onClose}>
          Cancel
        </CustomButton>
      </CustomCard>
    </BottomSheetModal>
  );
};

export default AndroidNFCModal;
