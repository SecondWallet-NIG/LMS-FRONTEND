export const formatDate = (inputDate) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const dateParts = inputDate.split('-');
    const year = dateParts[0];
    const monthIndex = parseInt(dateParts[1], 10) - 1; // Month is zero-based
    const day = dateParts[2];
  
    const formattedDate = `${months[monthIndex]}, ${day} ${year}`;
  
    return formattedDate;
  }


  export const formatTimeToAMPM = (timestamp) => {
    const date = new Date(timestamp);
  
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'UTC', // Assuming the input timestamp is in UTC
    };
  
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }