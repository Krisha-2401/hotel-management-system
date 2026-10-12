const rates = {"Standard Room":2499,"Deluxe Room":3999,"Executive Suite":6499,"Family Room":5299};
const $ = id => document.getElementById(id);
const today = new Date();
const dateString = d => { const x = new Date(d.getTime() - d.getTimezoneOffset()*60000); return x.toISOString().slice(0,10); };
const tomorrow = new Date(today); tomorrow.setDate(today.getDate()+1);
const dayAfter = new Date(today); dayAfter.setDate(today.getDate()+2);
["quickIn","checkIn"].forEach(id => { $(id).min = dateString(today); $(id).value = dateString(tomorrow); });
["quickOut","checkOut"].forEach(id => { $(id).min = dateString(tomorrow); $(id).value = dateString(dayAfter); });
$("checkIn").addEventListener("change", () => { const d = new Date($("checkIn").value+"T12:00:00"); d.setDate(d.getDate()+1); $("checkOut").min = dateString(d); if ($("checkOut").value <= $("checkIn").value) $("checkOut").value = dateString(d); });
$("quickIn").addEventListener("change", () => { const d = new Date($("quickIn").value+"T12:00:00"); d.setDate(d.getDate()+1); $("quickOut").min = dateString(d); if ($("quickOut").value <= $("quickIn").value) $("quickOut").value = dateString(d); });
function getBookings(){ try{return JSON.parse(localStorage.getItem("grandstayBookings")||"[]")}catch(e){return []} }
function saveBookings(items){localStorage.setItem("grandstayBookings",JSON.stringify(items));}
function nightsBetween(a,b){return Math.round((new Date(b+"T12:00:00")-new Date(a+"T12:00:00"))/86400000);}
function showToast(message){$("toastMessage").textContent=message; bootstrap.Toast.getOrCreateInstance($("noticeToast")).show();}
$("quickSearch").addEventListener("submit",e=>{e.preventDefault(); if($("quickOut").value<=$("quickIn").value){showToast("Check-out date must be after check-in.");return;} $("checkIn").value=$("quickIn").value; $("checkOut").value=$("quickOut").value; $("guestCount").value=$("quickGuests").value.split(" ")[0]; $("booking").scrollIntoView({behavior:"smooth"});});
document.querySelectorAll(".book-room").forEach(btn=>btn.addEventListener("click",()=>{$("roomType").value=btn.dataset.room;$("booking").scrollIntoView({behavior:"smooth"});}));
$("bookingForm").addEventListener("submit",e=>{
 e.preventDefault();
 const checkIn=$("checkIn").value, checkOut=$("checkOut").value, nights=nightsBetween(checkIn,checkOut);
 if(!checkIn||!checkOut||nights<1){showToast("Please choose a valid check-out date.");return;}
 const room=$("roomType").value;
 const booking={id:"GS"+Date.now().toString().slice(-7),name:$("guestName").value.trim(),email:$("guestEmail").value.trim(),checkIn,checkOut,room,guests:Number($("guestCount").value),request:$("specialRequest").value.trim(),amount:nights*rates[room],nights,createdAt:new Date().toISOString()};
 const all=getBookings();all.unshift(booking);saveBookings(all);renderDashboard();
 $("confirmationText").textContent=`Thanks, ${booking.name}! Your ${room} for ${nights} night(s) has been saved as demo booking ${booking.id}. Estimated room total: ₹${booking.amount.toLocaleString("en-IN")}.`;
 bootstrap.Modal.getOrCreateInstance($("confirmationModal")).show();$("bookingForm").reset();$("checkIn").value=dateString(tomorrow);$("checkOut").value=dateString(dayAfter);
});
function escapeHtml(value){return String(value).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch]));}
function renderDashboard(){
 const items=getBookings(), now=dateString(today);
 $("totalBookings").textContent=items.length;
 $("upcomingBookings").textContent=items.filter(b=>b.checkIn>=now).length;
 $("totalRevenue").textContent="₹"+items.reduce((sum,b)=>sum+Number(b.amount||0),0).toLocaleString("en-IN");
 $("bookingRows").innerHTML=items.length?items.map(b=>`<tr><td><strong>${escapeHtml(b.id)}</strong></td><td>${escapeHtml(b.name)}<br><small class="text-muted">${escapeHtml(b.email)}</small></td><td>${escapeHtml(b.room)}</td><td>${escapeHtml(b.checkIn)}<br><small class="text-muted">to ${escapeHtml(b.checkOut)}</small></td><td>${b.guests}</td><td>₹${Number(b.amount).toLocaleString("en-IN")}<br><small class="text-muted">${b.nights} night(s)</small></td><td><span class="status-pill">${b.checkIn>=now?"Upcoming":"Past stay"}</span></td></tr>`).join(""):`<tr><td colspan="7" class="empty-row">No bookings yet. Try the reservation form above.</td></tr>`;
}
$("clearBookings").addEventListener("click",()=>{if(confirm("Delete all demo bookings stored in this browser?")){saveBookings([]);renderDashboard();showToast("Demo booking records cleared.");}});
renderDashboard();
