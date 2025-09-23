const handleManualRefresh = async () => {
  try {
    setIsRefreshing(true);
    // Wait for both: refetch to finish AND at least 3s delay
    await Promise.all([
      refetch(),
      new Promise((resolve) => setTimeout(resolve, 3000)) // 👈 minimum 3 seconds
    ]);
  } finally {
    setIsRefreshing(false);
  }
};
