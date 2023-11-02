    // Your existing fetchData function here...

    // Function to apply filters when the button is clicked in Medicare tab
    function applyFilters() {
      const marketerFilter = document.getElementById("marketerFilter").value;
      const statusFilter = document.getElementById("statusFilter").value;
      const insuranceFilter = document.getElementById("insuranceFilter").value;
      const periodDropdown = document.getElementById("periodDropdown");
      const selectedPeriod = periodDropdown.value;

      // Fetch data from the JSON URL
      fetch("https://kirkneri.github.io/medsideapi/data.json")
        .then(response => response.json())
        .then(data => {
          // Filter matching data based on the selected 4-week period and filters
          const matchingData = data.data.filter(item =>
            item.weekPeriod === selectedPeriod &&
            (marketerFilter === "" || item.marketer === marketerFilter) &&
            (statusFilter === "" || item.status === statusFilter) &&
            (insuranceFilter === "" || item.insurance === insuranceFilter)
          );

          // Display the matching data in the Medicare table with "NA" for undefined values
          const tableBody = document.getElementById("tableBody");
          if (matchingData.length > 0) {
            tableBody.innerHTML = "";
            matchingData.forEach(item => {
              tableBody.innerHTML += `
                <tr>
                  <td>${item.weekPeriod || ''}</td>
                  <td>${item.socDate || ''}</td>
                  <td>${item.patient || ''}</td>
                  <td>${item.insurance || ''}</td>
                  <td>${item.referralSource || ''}</td>
                  <td>${item.referringPerson || ''}</td>
                  <td>${item.marketer || ''}</td>
                  <td>${item.status || ''}</td>
                  <td>${item.naReason || ''}</td>
                </tr>
              `;
            });
          } else {
            tableBody.innerHTML = "<tr><td colspan='8'>No data available for the selected filters</td></tr>";
          }
        })
        .catch(error => console.error("Error fetching data:", error));
    }

    // Attach the applyFilters function to the button click event in Medicare tab
    document.getElementById("filterButton").addEventListener("click", applyFilters);

    // Function to apply filters when the button is clicked in Pivots tab
function applyPivotsFilters() {
  const pivotsMarketerFilter = document.getElementById("pivotsMarketerFilter").value;
  const pivotsPeriodFilter = document.getElementById("pivotsPeriodFilter").value;

  // Fetch data from the JSON URL
  fetch("https://kirkneri.github.io/medsideapi/pivot.json")
    .then(response => response.json())
    .then(data => {
      // Filter matching data based on the selected 4-week period and marketer
      const matchingPivotData = data.data.filter(item =>
        item.weekPeriod === pivotsPeriodFilter &&
        (pivotsMarketerFilter === "" || item.marketer === pivotsMarketerFilter)
      );

      // Initialize variables to calculate the Grand Total
      let grandTotalAdmitted = 0;
      let grandTotalNACMA = 0;
      let grandTotalNAFaxHub = 0;
      let grandTotalNAIntake = 0;
      let grandTotalNASOC = 0;
      let grandTotalPendingSOC = 0;
      let grandTotalProcessingInIntake = 0;

      // Display the matching data in the Pivots table with "NA" for undefined values
      const pivotsTableBody = document.getElementById("pivotsTableBody");
      pivotsTableBody.innerHTML = "";

      matchingPivotData.forEach(item => {
        grandTotalAdmitted += parseInt(item.admitted) || 0;
        grandTotalNACMA += parseInt(item.naAtCma) || 0;
        grandTotalNAFaxHub += parseInt(item.naAtFaxHub) || 0;
        grandTotalNAIntake += parseInt(item.naAtIntake) || 0;
        grandTotalNASOC += parseInt(item.naAtSoc) || 0;
        grandTotalPendingSOC += parseInt(item.pendingSoc) || 0;
        grandTotalProcessingInIntake += parseInt(item.processingInIntake) || 0;

        pivotsTableBody.innerHTML += `
          <tr>
            <td>${item.marketer || ''}</td>
            <td>${item.referralSource || ''}</td>
            <td>${item.weekPeriod || ''}</td>
            <td>${item.admitted || ''}</td>
            <td>${item.naAtCma || ''}</td>
            <td>${item.naAtFaxHub || ''}</td>
            <td>${item.naAtIntake || ''}</td>
            <td>${item.naAtSoc || ''}</td>
            <td>${item.pendingSoc || ''}</td>
            <td>${item.processingInIntake || ''}</td>
          </tr>
        `;
      });

      // Update the Grand Total in the table footer
      document.getElementById("grandTotalAdmitted").textContent = grandTotalAdmitted;
      document.getElementById("grandTotalNACMA").textContent = grandTotalNACMA;
      document.getElementById("grandTotalNAFaxHub").textContent = grandTotalNAFaxHub;
      document.getElementById("grandTotalNAIntake").textContent = grandTotalNAIntake;
      document.getElementById("grandTotalNASOC").textContent = grandTotalNASOC;
      document.getElementById("grandTotalPendingSOC").textContent = grandTotalPendingSOC;
      document.getElementById("grandTotalProcessingInIntake").textContent = grandTotalProcessingInIntake;
    })
    .catch(error => console.error("Error fetching data:", error));
}

      // Attach the applyPivotsFilters function to the button click event in the Pivots tab
      document.getElementById("pivotsFilterButton").addEventListener("click", applyPivotsFilters);

      // JavaScript function to clear filters in the 'Medicare' tab
      function clearMedicareFilters() {
        document.getElementById("periodDropdown").value = "";
        document.getElementById("marketerFilter").value = "";
        document.getElementById("statusFilter").value = "";
        document.getElementById("insuranceFilter").value = "";
        document.getElementById("pivotsTableBody").textContent = "";
        document.getElementById("tableBody").textContent = "";
        // You can also trigger the filter function here if you have one
      }

      // JavaScript function to clear filters in the 'Pivots' tab
      function clearPivotsFilters() {
        document.getElementById("pivotsMarketerFilter").value = "";
        document.getElementById("pivotsPeriodFilter").value = "";
        // You can also trigger the filter function here if you have one
      }

      // JavaScript function to add event listeners for clear filter buttons
      function addClearFilterEventListeners() {
        document.getElementById("clearFilterButton").addEventListener("click", clearMedicareFilters);
        document.getElementById("pivotsClearFilterButton").addEventListener("click", clearPivotsFilters);
      }

      // Add the event listeners when the document is ready
      document.addEventListener("DOMContentLoaded", addClearFilterEventListeners);
