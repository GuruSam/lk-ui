<template>
  <div class="error-anim-wrap">
    <div class="error-sad-ghost">
      <div class="ghost-body">
        <div class="ghost-head">
          <div class="ghost-eye" id="left-eye">
            <div class="ghost-pupil">
              <div class="ghost-pupil-shimmer"></div>
            </div>
          </div>
          <div class="ghost-eye">
            <div class="ghost-pupil">
              <div class="ghost-pupil-shimmer"></div>
            </div>
          </div>
          <div class="ghost-mouth">
            (
          </div>
        </div>
        <div class="ghost-tail">
          <div class="ghost-bottom-tail" id="triangle1"></div>
          <div class="ghost-bottom-tail" id="triangle2"></div>
          <div class="ghost-bottom-tail" id="triangle3"></div>
          <div class="ghost-bottom-tail" id="triangle4"></div>
          <div class="ghost-bottom-tail" id="triangle5"></div>
        </div>
      </div>
    </div>
    <div class="error-ghost-shadow"></div>
  </div>
</template>

<script>
export default {
  name: 'ghost'
}
</script>

<style scoped>
.error-full-width-wrap,
.error-anim-wrap,
.ghost-head,
.ghost-eye,
.ghost-tail {
  display: flex;
}

.error-full-width-wrap,
.error-anim-wrap,
.ghost-head {
  align-items: center;
  justify-content: center;
}

.error-full-width-wrap,
.ghost-eye {
  justify-content: center;
}

.error-anim-wrap,
.ghost-body {
  position: relative;
}

.error-sad-ghost,
.ghost-head,
.ghost-mouth,
.ghost-tail,
.error-ghost-shadow {
  position: absolute;
}

.error-anim-wrap,
.ghost-body,
.ghost-head,
.error-ghost-shadow {
  width: 100px;
}

.ghost-head,
.ghost-eye,
.ghost-pupil,
.ghost-pupil-shimmer,
.error-ghost-shadow {
  border-radius: 50%;
}

.ghost-body,
.ghost-head {
  background-color: #2988a0; 
}

.ghost-pupil,
.error-ghost-shadow {
  background-color: #212121;
}

.error-full-width-wrap {
  min-height: 100vh;
  background-color: #673AB7;
}

.error-anim-wrap {
  height: 170px;
  margin: 0 auto;
}

.error-sad-ghost {
  animation: float 2.5s infinite cubic-bezier(0.4, 0.0, 0.2, 1);
}

.ghost-body {
  height: 70px;
}

.ghost-head {
  height: 100px;
  top: -50px;
}

.ghost-eye {
  width: 30px;
  height: 30px;
  background-color: #FFF;
  align-items: flex-end;
}

#left-eye {
  margin-right: 5px;
}

.ghost-pupil {
  width: 15px;
  height: 15px;
}

.ghost-pupil-shimmer {
  width: 8px;
  height: 8px;
  background-color: #FFF;
}

.ghost-mouth {
  transform: rotate(90deg);
  text-align: center;
  color: #FFF;
  font-size: 30px;
  top: 55px;
  left: 48px;
}

.ghost-tail {
  height: 10px;
  width: 100%;
  top: 100%;
}

.ghost-bottom-tail {
  width: 0px;
  height: 0px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #2988a0;
}

.error-ghost-shadow {
  height: 10px;
  bottom: 0;
  animation: shadow 2.5s infinite cubic-bezier(0.4, 0.0, 0.2, 1);
}

@keyframes float {
  0% { top: 50px; }
  50%   { top: 65px; }
  100%   { top: 50px; }
}

@keyframes shadow {
  0% {
    transform: scale(0.7);
    -webkit-transform: scale(0.7);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(0.7);
    -webkit-transform: scale(0.7);
    opacity: 0.5;
  }
}
</style>
