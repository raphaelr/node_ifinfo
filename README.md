ipinfo
======
More informations about the local network interfaces
----------------------------------------------------

This library provides access to more detailed network information about
the interface configuration of the system. It attempts to provide:

* The name and description of the adapter
* It's physical address
* IP addresses and subnet masks
* Default gateways
* DNS server
* Routing tables

Supported platforms
===================
Ideally, ipinfo will support all major platforms in the future. Right now,
it's in the early development stage. The roadmap for platform support is:

* Windows >= Vista
* Windows < Vista
* Linux
* BSD, if the Linux support doesn't magically already cut it

OSX support won't be implemented by me, due to lack of software, hardware
and motivation. Feel free to submit pull requests though.

Requirements
============
* [node.js](http://nodejs.org) (obviously)
* The dependencies listed in [package.json](https://github.com/raphaelr/node_pcap-ffi/blob/master/package.json).

License
=======
Copyright (c) 2012, Raphael Robatsch  
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright
  notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright
  notice, this list of conditions and the following disclaimer in the
  documentation and/or other materials provided with the distribution.
* The names of the authors and contributors may be used to endorse
  or promote products derived from this software without specific
  prior written permission.

**THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE AUTHORS AND CONTRIBUTORS BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.**
