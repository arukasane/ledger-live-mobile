// @flow
import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Trans } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import type { Account } from "@ledgerhq/live-common/lib/types";
import type { Transaction } from "@ledgerhq/live-common/lib/families/stellar/types";
import LText from "../../components/LText";
import colors from "../../colors";
import { ScreenName } from "../../const";
import SummaryRow from "../../screens/SendFunds/SummaryRow";

type Props = {
  account: Account,
  transaction: Transaction,
};

export default function StellarMemoValueRow({ account, transaction }: Props) {
  const navigation = useNavigation();

  const editMemo = useCallback(() => {
    navigation.navigate(ScreenName.StellarEditMemoType, {
      account,
      transaction,
    });
  }, [navigation, account, transaction]);

  const memoType = transaction.memoType;
  const memoValue = transaction.memoValue;
  return (
    <View>
      {!memoType || !memoValue ? (
        <SummaryRow
          title={<Trans i18nKey="stellar.memo.title" />}
          onPress={editMemo}
        >
          <LText style={styles.link} onPress={editMemo}>
            <Trans i18nKey="common.edit" />
          </LText>
        </SummaryRow>
      ) : (
        <SummaryRow
          title={
            <Trans i18nKey={`stellar.memoType.${memoType || "NO_MEMO"}`} />
          }
          onPress={editMemo}
        >
          <LText semiBold style={styles.tagText} onPress={editMemo}>
            {String(memoValue)}
          </LText>
        </SummaryRow>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  memoContainer: {
    flexDirection: "row",
  },
  tagText: {
    fontSize: 14,
    color: colors.darkBlue,
  },
  link: {
    color: colors.live,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    textDecorationColor: colors.live,
    marginLeft: 8,
  },
  memo: {
    marginBottom: 10,
  },
});
