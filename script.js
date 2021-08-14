"use strict"

console.log("Connected")

const billAmountText = document.querySelector(".bill-amt-text")
const tipButtons = document.querySelectorAll(".tip-amt-btn")
const tipText = document.querySelector(".tip-amt-text")
const peopleCountText = document.querySelector(".people-count-text")
const resetButton = document.querySelector(".reset")
const totalTipAmountPerPersonDisplay = document.querySelector(
  ".total-tip-amt-perhead"
)
const totalBillAmountPerPersonDisplay = document.querySelector(
  ".total-bill-amt-perhead"
)

const billAlertMessage = document.querySelector(".bill-amt-header .alert-msg")
const peopleAlertMessage = document.querySelector(
  ".people-count-header .alert-msg"
)
let billAmount, tipAmount, peopleCount
let isResetEnabled = false

//set bill amount
function setBillAmount() {
  if (parseInt(billAmountText.value) < 1) {
    billAlertMessage.classList.remove("hidden")
    billAmountText.setAttribute("id", "alert-text-box")
  } else {
    billAlertMessage.classList.add("hidden")
    billAmountText.removeAttribute("id")
    billAmount = parseInt(billAmountText.value)
    calculateBill()
  }
  if (!isResetEnabled) setResetButton(true)
}

//set tip percentage

function setTipAmount() {
  tipButtons.forEach(tipButton => {
    tipButton.classList.remove("clicked")
  })
  tipText.classList.remove("custom-tip-amt")
  if (this.classList.contains("tip-amt-btn")) {
    this.classList.add("clicked")
    tipText.value = null
    tipAmount = this.value
  } else {
    if (this.value) {
      this.classList.add("custom-tip-amt")
      tipAmount = this.value
    }
  }
  calculateBill()
  if (!isResetEnabled) setResetButton(true)
}

//set people count

function setPeopleCount() {
  if (parseInt(peopleCountText.value) < 1) {
    peopleAlertMessage.classList.remove("hidden")
    peopleCountText.setAttribute("id", "alert-text-box")
  } else {
    peopleAlertMessage.classList.add("hidden")
    peopleCountText.removeAttribute("id")
    peopleCount = parseInt(peopleCountText.value)
    calculateBill()
  }
  if (!isResetEnabled) setResetButton(true)
}

function calculateBill() {
  if (peopleCount && billAmount && tipAmount) {
    //calculate total bill amount => bill amount + bill amount*(tip percentage / 100)
    let totalTipAmount = billAmount * (tipAmount / 100)
    let totalBillAmount = billAmount + totalTipAmount
    //calculate per person tip amount => tip amount / people count
    let totalTipAmountPerPerson = totalTipAmount / peopleCount
    totalTipAmountPerPersonDisplay.innerText =
      "$" + totalTipAmountPerPerson.toFixed(2)
    //calculate per person bill amount => bill amount / people count
    let totalBillAmountPerPerson = totalBillAmount / peopleCount
    totalBillAmountPerPersonDisplay.innerText =
      "$" + totalBillAmountPerPerson.toFixed(2)
  }
}

function setResetButton(state) {
  if (state) {
    resetButton.classList.remove("disabled")
    resetButton.classList.add("enabled")
    isResetEnabled = true
  } else {
    resetButton.classList.add("disabled")
    resetButton.classList.remove("enabled")
    isResetEnabled = false
  }
}

function reset() {
  billAmount = 0
  tipAmount = 0
  peopleCount = 0
  setResetButton(false)
  billAmountText.value = null
  peopleCountText.value = null
  peopleCountText.removeAttribute("id")
  billAmountText.removeAttribute("id")
  totalBillAmountPerPersonDisplay.innerText = "$0.00"
  totalTipAmountPerPersonDisplay.innerText = "$0.00"
  tipButtons.forEach(tipButton => {
    tipButton.classList.remove("clicked")
  })
  tipText.value = null
  tipText.classList.remove("custom-tip-amt")
  billAlertMessage.classList.add("hidden")
  peopleAlertMessage.classList.add("hidden")
}

billAmountText.addEventListener("input", setBillAmount)
tipButtons.forEach(tipButton => {
  tipButton.addEventListener("click", setTipAmount)
})
tipText.addEventListener("input", setTipAmount)
peopleCountText.addEventListener("input", setPeopleCount)
resetButton.addEventListener("click", reset)
