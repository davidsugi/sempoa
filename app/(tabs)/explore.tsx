import { StyleSheet } from 'react-native';

import ExpenseTracker from '@/components/Expensetracker';

export default function TabTwoScreen() {
  return (<ExpenseTracker />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
