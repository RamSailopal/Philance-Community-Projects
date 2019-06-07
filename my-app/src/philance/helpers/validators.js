export const startProjectSubmitValidation = (form) => {
  return new Promise((resolve, reject) => {
    if (
      form.name === "" ||
      form.summary === "" ||
      form.challenge === "" ||
      form.solution === "" ||
      form.justification === "" ||
      form.interests === "" ||
      form.country === "" ||
      form.startDate === "" ||
      form.endDate === "" ||
      form.budget === "" ||
      form.zipCode === "" ||
      form.city === "" ||
      form.budgetDetails === "" ||
      form.imagesFiles.length === 0 ||
      (
        (form.volunteers === ""
          ? 0
          : parseInt(form.volunteers)) < 1 &&
        (form.freeLancers === ""
          ? 0
          : parseInt(form.freelancers)) < 1) ||

      form.startDate > form.endDate
    ) {
      let resp = {
        invalidName: false,
        invalidSummary: false,
        invalidChallenge: false,
        invalidCity: false,
        invalidBudgetDetails: false,
        invalidSolution: false,
        invalidJustification: false,
        invalidInterests: false,
        invalidCountry: false,
        invalidStartDate: false,
        invalidEndDate: false,
        invalidBudget: false,
        invalidZipCode: false,
        invalidZipCode: false,
        invalidVolunteers: false,
        invalidVolunteers: false,
        invalidFreelancers: false,
        invalidFreelancers: false,
        validstartDate: false,
        validstartDate: false,
        invalidImageFiles: false
      }
      if (form.name === "") {
        resp['invalidName'] = true
      }
      if (form.summary === "") {
        resp['invalidSummary'] = true
      }
      if (form.challenge === "") {
        resp['invalidChallenge'] = true
      }
      if (form.city === "") {
        resp['invalidCity'] = true
      }
      if (form.budgetDetails === "") {
        resp['invalidBudgetDetails'] = true
      }
      if (form.solution === "") {
        resp['invalidSolution'] = true
      }
      if (form.justification === "") {
        resp['invalidJustification'] = true
      }
      if (form.interests === "") {
        resp['invalidInterests'] = true
      }
      if (form.country === "") {
        resp['invalidCountry'] = true
      }
      if (form.startDate === "") {
        resp['invalidStartDate'] = true
      }
      if (form.endDate === "") {
        resp['invalidEndDate'] = true
      }
      if (form.budget === "") {
        resp['invalidBudget'] = true
      }
      if (form.zipCode === "") {
        resp['invalidZipCode'] = true
      }
      if (form.city === "") {
        resp['invalidZipCode'] = true
      }
      if (parseInt(form.volunteers) < 1) {
        resp['invalidVolunteers'] = true
      }
      if (
        form.volunteers ? !form.volunteers.match("^[0-9]{1,3}$") : null
      ) {
        resp['invalidVolunteers'] = true
      }
      if (parseInt(form.freelancers) < 1) {
        resp['invalidFreelancers'] = true
      }
      if (
        form.freelancers ? !form.freelancers.match("^[0-9]{1,3}$") : null
      ) {
        resp['invalidFreelancers'] = true
      }
      if (form.startDate > form.endDate) {
        resp['validstartDate'] = true
        resp['validstartDate'] = true
      }
      if (form.imagesFiles.length == 0) {
        resp['invalidImageFiles'] = true
      }
      reject(resp)
    } else {
      resolve()
    }
  })
}