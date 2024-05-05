import React, { useImperativeHandle, useMemo, useRef } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useTheme } from "styled-components/native";
import { StyleSheet } from "react-native";

import CustomText from "./CustomText";
import CustomView from "./CustomView";
import CustomButton from "./CustomButton";

interface ModalProps {
  onClose?: () => void;
  open?: boolean;
  timeout?: number;
  message: string;
  onConfirm: () => void;
}

const CustomDialog: React.FC<ModalProps> = (props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const timeoutId = useRef<any>(null);
  const theme = useTheme();

  const snapPoints = useMemo(() => ["38%"], []);

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

  const onClose = () => {
    if (props?.onClose) {
      props?.onClose();
    }
  };

  const onConfirm = () => {
    if (props?.onConfirm) {
      onClose();
      props.onConfirm();
    }
  };

  const renderFooter = React.useCallback(
    (footerProps: BottomSheetFooterProps) => (
      <BottomSheetFooter {...footerProps}>
        <CustomView
          $transparent
          sx={{ width: "100%", flexDirection: "row", height: 100, bottom: 0 }}
        >
          <CustomButton
            size="md"
            onPress={onClose}
            sx={(theme) => ({
              width: "50%",
              height: "100%",
              backgroundColor: theme.colors.slate["100"],
            })}
            flat
            $contrastColor={theme.colors.text}
          >
            Cancel
          </CustomButton>
          <CustomButton
            size="md"
            onPress={onConfirm}
            sx={{ width: "50%", height: "100%" }}
            flat
          >
            Confirm
          </CustomButton>
        </CustomView>
      </BottomSheetFooter>
    ),
    [theme.colors]
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleStyle={{
        display: "none",
      }}
      backdropComponent={renderBackdrop}
      index={0}
      onDismiss={onClose}
      enablePanDownToClose
      enableOverDrag
      enableHandlePanningGesture
      enableDismissOnClose
      footerComponent={renderFooter}
      containerStyle={{
        paddingBottom: 0,
      }}
      style={{
        paddingBottom: 0,
        backgroundColor: "transparent",
      }}
      backgroundStyle={{
        backgroundColor: theme.colors.cardBackground,
        borderWidth: 1.1,
        borderColor: theme.colors.cardBorder,
      }}
    >
      <CustomView
        $transparent
        sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <CustomText sx={{ textAlign: "center", top: -50 }} variant="h4">
          {props?.message}
        </CustomText>
      </CustomView>
    </BottomSheetModal>
  );
};

export default CustomDialog;
