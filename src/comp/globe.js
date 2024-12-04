// src/components/Globe.js
import React, { useEffect, useState } from "react";
import { Flex, CircularProgress, Text, useColorMode } from "@chakra-ui/react";
import MasterContainer from "./screen/mastercontainer";
import lodash from "lodash";
import { connect } from "react-redux";
import Actions from "./redux/action";

const Globe = ({ isMasterAppLoading, setIsMasterAppLoading }) => {
  const { colorMode } = useColorMode();
  const [state, setState] = useState({});

  const updateState = (data) => setState((prevState) => ({ ...prevState, ...data }));

  // Corrected line: Use props.setIsMasterAppLoading
  useEffect(() => {
    setIsMasterAppLoading(true);
  }, [setIsMasterAppLoading]);

  const renderLoader = () => (
    <Flex
      flexDirection={"row"}
      position={"absolute"}
      justifyItems={"center"}
      alignSelf={"center"}
      alignItems={"center"}
      top={"0%"}
      left={"0%"}
      width={"100vw"}
      height={"100vh"}
      backdropFilter="auto"
      backdropBlur="5px"
      backdropBrightness={"50%"}
      zIndex={150}
    >
      <Flex
        flexDirection={"row"}
        position={"absolute"}
        justifyItems={"center"}
        alignSelf={"center"}
        alignItems={"center"}
        top={"50%"}
        left={"50%"}
        boxShadow="lg"
        transform={"translate(-50%, -50%)"}
        backdropFilter="auto"
        backdropBlur="5px"
        backdropBrightness={"80%"}
        borderWidth={1}
        backgroundColor={colorMode === "dark" ? "gray.700" : "gray.300"}
        borderColor={colorMode === "dark" ? "gray.700" : "gray.400"}
        borderRadius={12}
        px={6}
        py={6}
        zIndex={100}
      >
        <CircularProgress isIndeterminate thickness={10} size={6} />
        <Text ms={3} fontWeight={"semibold"} fontSize={"medium"}>
          {"Loading ..."}
        </Text>
      </Flex>
    </Flex>
  );

  return (
    <>
      <MasterContainer />
      {isMasterAppLoading && !lodash.isNil(colorMode) && renderLoader()}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isMasterAppLoading: state.isMasterAppLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsMasterAppLoading: (isMasterAppLoading) =>
      dispatch(Actions.setIsMasterAppLoading(isMasterAppLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Globe);
